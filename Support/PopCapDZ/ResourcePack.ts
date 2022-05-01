/** PopCap-DZ资源打包 */
namespace TwinKleS.Support.PopCapDZ.ResourcePack {

	// ------------------------------------------------

	/**
	 * 将资源目录内的所有文件打包为PopCap-DZ数据包
	 * @param resource_directory 资源目录
	 * @param resource_store_method 数据存储模方式
	 * @returns 数据包数据
	 */
	export function pack(
		resource_directory: string,
		resource_store_method: Core.Tool.Package.PopCapDZ.Information.JS_N.ResourceStoreMethod,
	): [Core.ByteArray, Core.Size] {
		let resource_list = CoreX.FileSystem.list_file(resource_directory);
		Output.v(`共${resource_list.length}个资源文件`);
		let manifest_js: Core.Tool.Package.PopCapDZ.Information.JS_N.Package = {
			resource: [],
		};
		let package_size_bound = 0;
		package_size_bound += 8; // header size
		package_size_bound += 1; // end flag
		for (let resource of resource_list) {
			manifest_js.resource.push({
				path: resource,
				store_method: resource_store_method,
			});
			let resource_size = CoreX.FileSystem.file_size(`${resource_directory}/${resource}`);
			package_size_bound += 1 + (1 + resource.length + 4 + 8) + Number(resource_size); // continue flag + resource information + resource data
		}
		Output.i(`开始打包 ...`);
		let package_data = Core.ByteArray.alloc(Core.Size.value(BigInt(package_size_bound)));
		let package_stream = Core.ByteStreamView.look(package_data.view());
		let manifest = Core.Tool.Package.PopCapDZ.Information.Package.json(Core.JSON.Value.value(manifest_js));
		Core.Tool.Package.PopCapDZ.Pack.pack(package_stream, manifest, Core.Path.value(resource_directory));
		Output.i(`完成`);
		return [package_data, package_stream.position()];
	}

	// ------------------------------------------------

}