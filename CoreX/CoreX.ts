/** 对Core中部分功能的包装 */
namespace TwinKleS.CoreX {

	export namespace FileSystem {

		// ------------------------------------------------

		export function exist(
			path: string,
		): boolean {
			return Core.FileSystem.exist(Core.Path.value(path)).value;
		}

		export function exist_file(
			path: string,
		): boolean {
			return Core.FileSystem.exist_file(Core.Path.value(path)).value;
		}

		export function exist_directory(
			path: string,
		): boolean {
			return Core.FileSystem.exist_directory(Core.Path.value(path)).value;
		}

		// ------------------------------------------------

		export function create_directory(
			path: string,
		): void {
			return Core.FileSystem.create_directory(Core.Path.value(path));
		}

		export function current_directory(
		): string {
			return Core.FileSystem.current_directory().value;
		}

		export function change_directory(
			path: string,
		): void {
			return Core.FileSystem.change_directory(Core.Path.value(path));
		}

		// ------------------------------------------------

		export function copy(
			source: string,
			dest: string,
		): void {
			return Core.FileSystem.copy(Core.Path.value(source), Core.Path.value(dest));
		}

		export function remove(
			path: string,
		): void {
			return Core.FileSystem.remove(Core.Path.value(path));
		}

		export function rename(
			old_path: string,
			new_path: string,
		): void {
			return Core.FileSystem.rename(Core.Path.value(old_path), Core.Path.value(new_path));
		}

		// ------------------------------------------------

		export function create_link(
			link: string,
			target: string,
			is_directory: boolean,
		): void {
			return Core.FileSystem.create_link(Core.Path.value(link), Core.Path.value(target), Core.Boolean.value(is_directory));
		}

		export function create_hard_link(
			link: string,
			target: string,
		): void {
			return Core.FileSystem.create_hard_link(Core.Path.value(link), Core.Path.value(target));
		}

		// ------------------------------------------------

		export function count(
			directory: string,
			depth: null | bigint = null,
		): bigint {
			return Core.FileSystem.count(Core.Path.value(directory), Core.SizeOptional.value(depth)).value;
		}

		export function count_file(
			directory: string,
			depth: null | bigint = null,
		): bigint {
			return Core.FileSystem.count_file(Core.Path.value(directory), Core.SizeOptional.value(depth)).value;
		}

		export function count_directory(
			directory: string,
			depth: null | bigint = null,
		): bigint {
			return Core.FileSystem.count_directory(Core.Path.value(directory), Core.SizeOptional.value(depth)).value;
		}

		// ------------------------------------------------

		export function list(
			directory: string,
			depth: null | bigint = null,
		): Array<string> {
			return Core.FileSystem.list(Core.Path.value(directory), Core.SizeOptional.value(depth)).value;
		}

		export function list_file(
			directory: string,
			depth: null | bigint = null,
		): Array<string> {
			return Core.FileSystem.list_file(Core.Path.value(directory), Core.SizeOptional.value(depth)).value;
		}

		export function list_directory(
			directory: string,
			depth: null | bigint = null,
		): Array<string> {
			return Core.FileSystem.list_directory(Core.Path.value(directory), Core.SizeOptional.value(depth)).value;
		}

		// ------------------------------------------------

		export function file_size(
			path: string,
		): bigint {
			return Core.FileSystem.file_size(Core.Path.value(path)).value;
		}

		// ------------------------------------------------

		export function read_file(
			path: string,
		): Core.ByteArray {
			return Core.FileSystem.read_file(Core.Path.value(path));
		}

		export function write_file(
			path: string,
			data: Core.ByteListView | Core.ByteArray | ArrayBuffer,
		): void {
			let data_view: Core.ByteListView;
			if (data instanceof Core.ByteListView) {
				data_view = data;
			}
			if (data instanceof Core.ByteArray) {
				data_view = data.view();
			}
			if (data instanceof ArrayBuffer) {
				data_view = Core.ByteListView.value(data);
			}
			return Core.FileSystem.write_file(Core.Path.value(path), data_view!);
		}

		// ------------------------------------------------

	}

	export namespace JSON {

		// ------------------------------------------------

		const g_write_buffer = Core.ByteArray.default();

		export function set_write_buffer_size(
			size: bigint,
		): void {
			g_write_buffer.alloc(Core.Size.value(size));
			return;
		}

		// ------------------------------------------------

		const g_write_format: {
			disable_trailing_comma: boolean;
			disable_array_wrap_line: boolean;
		} = {
			disable_trailing_comma: false,
			disable_array_wrap_line: false,
		};

		export function set_write_format(
			disable_trailing_comma: boolean,
			disable_array_wrap_line: boolean,
		): void {
			g_write_format.disable_trailing_comma = disable_trailing_comma;
			g_write_format.disable_array_wrap_line = disable_array_wrap_line;
			return;
		}

		// ------------------------------------------------

		export function read<ConstraintT extends Core.JSON.JS_Value>(
			data: ArrayBuffer,
		): Core.JSON.Value<ConstraintT> {
			let stream = Core.CharacterStreamView.look(Core._Detail.cast_ByteListView_to_CharacterListView(Core.ByteListView.value(data)));
			let value = Core.JSON.Value.default<ConstraintT>();
			Core.JSON.Read.read(stream, value);
			return value;
		}

		/** NOTE : result is a view of buffer */
		export function write<ConstraintT extends Core.JSON.JS_Value>(
			value: Core.JSON.Value<ConstraintT>,
			disable_trailing_comma: boolean = g_write_format.disable_trailing_comma,
			disable_array_wrap_line: boolean = g_write_format.disable_array_wrap_line,
			buffer: Core.CharacterListView | bigint = Core._Detail.cast_ByteListView_to_CharacterListView(g_write_buffer.view()),
		): ArrayBuffer {
			let buffer_if = typeof buffer === 'bigint' ? Core.ByteArray.alloc(Core.Size.value(buffer)) : null;
			let buffer_view = buffer instanceof Core.CharacterListView ? buffer : Core._Detail.cast_ByteListView_to_CharacterListView(buffer_if!.view());
			let stream = Core.CharacterStreamView.look(buffer_view);
			Core.JSON.Write.write(stream, value, Core.Boolean.value(disable_trailing_comma), Core.Boolean.value(disable_array_wrap_line), Core.Size.value(0n));
			return Core._Detail.cast_CharacterListView_to_ByteListView(stream.stream_view()).value;
		}

		// ------------------------------------------------

		export function read_s<ConstraintT extends Core.JSON.JS_Value>(
			string: string,
		): Core.JSON.Value<ConstraintT> {
			let data = Core._Detail.cast_moveable_String_to_ByteArray(Core.String.value(string));
			return read(data.view().value);
		}

		export function write_s<ConstraintT extends Core.JSON.JS_Value>(
			value: Core.JSON.Value<ConstraintT>,
			disable_trailing_comma: boolean = g_write_format.disable_trailing_comma,
			disable_array_wrap_line: boolean = g_write_format.disable_array_wrap_line,
			buffer: Core.CharacterListView | bigint = Core._Detail.cast_ByteListView_to_CharacterListView(g_write_buffer.view()),
		): string {
			let data = write(value, disable_trailing_comma, disable_array_wrap_line, buffer);
			return Core._Detail.cast_CharacterListView_to_JS_String(Core._Detail.cast_ByteListView_to_CharacterListView(Core.ByteListView.value(data)));
		}

		// ------------------------------------------------

		export function read_fs<ConstraintT extends Core.JSON.JS_Value>(
			file: string,
		): Core.JSON.Value<ConstraintT> {
			let data = FileSystem.read_file(file);
			return read(data.view().value);
		}

		export function write_fs<ConstraintT extends Core.JSON.JS_Value>(
			file: string,
			value: Core.JSON.Value<ConstraintT>,
			disable_trailing_comma: boolean = g_write_format.disable_trailing_comma,
			disable_array_wrap_line: boolean = g_write_format.disable_array_wrap_line,
			buffer: Core.CharacterListView | bigint = Core._Detail.cast_ByteListView_to_CharacterListView(g_write_buffer.view()),
		): void {
			let data = write(value, disable_trailing_comma, disable_array_wrap_line, buffer);
			FileSystem.write_file(file, data);
			return;
		}

		// ------------------------------------------------

		export function read_js<ConstraintT extends Core.JSON.JS_Value>(
			data: ArrayBuffer,
		): ConstraintT {
			return read<ConstraintT>(data).value;
		}

		export function write_js<ConstraintT extends Core.JSON.JS_Value>(
			value: ConstraintT,
			disable_trailing_comma: boolean = g_write_format.disable_trailing_comma,
			disable_array_wrap_line: boolean = g_write_format.disable_array_wrap_line,
			buffer: Core.CharacterListView | bigint = Core._Detail.cast_ByteListView_to_CharacterListView(g_write_buffer.view()),
		): ArrayBuffer {
			return write(Core.JSON.Value.value<ConstraintT>(value), disable_trailing_comma, disable_array_wrap_line, buffer);
		}

		// ------------------------------------------------

		export function read_s_js<ConstraintT extends Core.JSON.JS_Value>(
			string: string,
		): ConstraintT {
			return read_s<ConstraintT>(string).value;
		}

		export function write_s_js<ConstraintT extends Core.JSON.JS_Value>(
			value: ConstraintT,
			disable_trailing_comma: boolean = g_write_format.disable_trailing_comma,
			disable_array_wrap_line: boolean = g_write_format.disable_array_wrap_line,
			buffer: Core.CharacterListView | bigint = Core._Detail.cast_ByteListView_to_CharacterListView(g_write_buffer.view()),
		): string {
			return write_s(Core.JSON.Value.value<ConstraintT>(value), disable_trailing_comma, disable_array_wrap_line, buffer);
		}

		// ------------------------------------------------

		export function read_fs_js<ConstraintT extends Core.JSON.JS_Value>(
			file: string,
		): ConstraintT {
			return read_fs<ConstraintT>(file).value;
		}

		export function write_fs_js<ConstraintT extends Core.JSON.JS_Value>(
			file: string,
			value: ConstraintT,
			disable_trailing_comma: boolean = g_write_format.disable_trailing_comma,
			disable_array_wrap_line: boolean = g_write_format.disable_array_wrap_line,
			buffer: Core.CharacterListView | bigint = Core._Detail.cast_ByteListView_to_CharacterListView(g_write_buffer.view()),
		): void {
			return write_fs(file, Core.JSON.Value.value<ConstraintT>(value), disable_trailing_comma, disable_array_wrap_line, buffer);
		}

		// ------------------------------------------------

	}

	export namespace XML {

		// ------------------------------------------------

		export function read_fs(
			file: string,
		): Core.XML.Node {
			let data = FileSystem.read_file(file);
			let string = Core._Detail.cast_ByteListView_to_CharacterListView(data.view());
			return Core.XML.Read.read(string);
		}

		export function write_fs(
			file: string,
			value: Core.XML.Node,
		): void {
			let string = Core.XML.Write.write(value);
			FileSystem.write_file(file, Core._Detail.cast_CharacterListView_to_ByteListView(Core._Detail.cast_String_to_CharacterListView(string)));
			return;
		}

		// ------------------------------------------------

		export function read_fs_js(
			file: string,
		): Core.XML.JS_Node {
			return read_fs(file).value;
		}

		export function write_fs_js(
			file: string,
			value: Core.XML.JS_Node,
		): void {
			return write_fs(file, Core.XML.Node.value(value));
		}

		// ------------------------------------------------

	}

	export namespace Tool {

		export namespace Data {

			export namespace Encode {

				export namespace Base64 {

					export function encode_fs(
						raw_file: string,
						ripe_file: string,
					): void {
						let raw_data = FileSystem.read_file(raw_file);
						let ripe_size = Core.Tool.Data.Encode.Base64.Encode.compute_ripe_size(raw_data.size());
						let ripe_data = Core.ByteArray.alloc(ripe_size);
						let raw_stream = Core.ByteStreamView.look(raw_data.view());
						let ripe_stream = Core.CharacterStreamView.look(Core._Detail.cast_ByteListView_to_CharacterListView(ripe_data.view()));
						Core.Tool.Data.Encode.Base64.Encode.encode(raw_stream, ripe_stream);
						FileSystem.write_file(ripe_file, Core._Detail.cast_CharacterListView_to_ByteListView(ripe_stream.stream_view()));
						return;
					}

					export function decode_fs(
						ripe_file: string,
						raw_file: string,
					): void {
						let ripe_data = FileSystem.read_file(ripe_file);
						let ripe_stream = Core.CharacterStreamView.look(Core._Detail.cast_ByteListView_to_CharacterListView(ripe_data.view()));
						let raw_size = Core.Tool.Data.Encode.Base64.Decode.compute_raw_size(ripe_stream.view());
						let raw_data = Core.ByteArray.alloc(raw_size);
						let raw_stream = Core.ByteStreamView.look(raw_data.view());
						Core.Tool.Data.Encode.Base64.Decode.decode(ripe_stream, raw_stream);
						FileSystem.write_file(raw_file, raw_stream.stream_view());
						return;
					}

				}

			}

			export namespace Encrypt {

				export namespace XOR {

					export function crypt_fs(
						plain_file: string,
						cipher_file: string,
						key: bigint,
					): void {
						let plain_data = FileSystem.read_file(plain_file);
						let cipher_data = Core.ByteArray.alloc(plain_data.size());
						let plain_stream = Core.ByteStreamView.look(plain_data.view());
						let cipher_stream = Core.ByteStreamView.look(cipher_data.view());
						Core.Tool.Data.Encrypt.XOR.crypt(plain_stream, cipher_stream, Core.Byte.value(key));
						FileSystem.write_file(cipher_file, cipher_stream.stream_view());
						return;
					}

				}

			}

			export namespace Compress {

				export namespace ZLib {

					export type CompressionLevel = 0n | 1n | 2n | 3n | 4n | 5n | 6n | 7n | 8n | 9n;

					export function compress_fs(
						raw_file: string,
						ripe_file: string,
						level: CompressionLevel = 9n,
					): void {
						let raw_data = FileSystem.read_file(raw_file);
						let ripe_size_bound = Core.Tool.Data.Compress.ZLib.Compress.compute_ripe_size_bound(raw_data.size());
						let ripe_data = Core.ByteArray.alloc(ripe_size_bound);
						let raw_stream = Core.ByteStreamView.look(raw_data.view());
						let ripe_stream = Core.ByteStreamView.look(ripe_data.view());
						Core.Tool.Data.Compress.ZLib.Compress.compress(raw_stream, ripe_stream, Core.Size.value(level));
						FileSystem.write_file(ripe_file, ripe_stream.stream_view());
						return;
					}

					export function uncompress_fs(
						ripe_file: string,
						raw_file: string,
						raw_data_buffer: Core.ByteListView | bigint,
					): void {
						let raw_data_buffer_if = typeof raw_data_buffer === 'bigint' ? Core.ByteArray.alloc(Core.Size.value(raw_data_buffer)) : null;
						let raw_data_buffer_view = raw_data_buffer instanceof Core.ByteListView ? raw_data_buffer : raw_data_buffer_if!.view();
						let ripe_data = FileSystem.read_file(ripe_file);
						let ripe_stream = Core.ByteStreamView.look(ripe_data.view());
						let raw_stream = Core.ByteStreamView.look(raw_data_buffer_view);
						Core.Tool.Data.Compress.ZLib.Uncompress.uncompress(ripe_stream, raw_stream);
						FileSystem.write_file(raw_file, raw_stream.stream_view());
						return;
					}

				}

			}

			export namespace Hash {

				export namespace MD5 {

					export function hash_fs(
						file: string,
						use_upper_case_number: boolean = false,
					): string {
						let data = FileSystem.read_file(file);
						return Core.Tool.Data.Hash.MD5.hash_to_string(data.view(), Core.Boolean.value(use_upper_case_number)).value;
					}

				}

			}

		}

		export namespace Package {

			export namespace PopCapPAK {

				export function pack_fs(
					package_file: string,
					manifest_file: string,
					resource_directory: string,
					package_data_buffer: Core.ByteListView | bigint,
				): void {
					let package_data_buffer_if = typeof package_data_buffer === 'bigint' ? Core.ByteArray.alloc(Core.Size.value(package_data_buffer)) : null;
					let package_data_buffer_view = package_data_buffer instanceof Core.ByteListView ? package_data_buffer : package_data_buffer_if!.view();
					let package_stream = Core.ByteStreamView.look(package_data_buffer_view);
					let manifest = Core.Tool.Package.PopCapPAK.Information.Package.json(JSON.read_fs<Core.Tool.Package.PopCapPAK.Information.JS_N.Package>(manifest_file));
					Core.Tool.Package.PopCapPAK.Pack.pack(package_stream, manifest, Core.Path.value(resource_directory));
					FileSystem.write_file(package_file, package_stream.stream_view());
					return;
				}

				export function unpack_fs(
					package_file: string,
					manifest_file: null | string,
					resource_directory: null | string,
				): void {
					let package_data = FileSystem.read_file(package_file);
					let package_stream = Core.ByteStreamView.look(package_data.view());
					let manifest = Core.Tool.Package.PopCapPAK.Information.Package.default();
					Core.Tool.Package.PopCapPAK.Unpack.unpack(package_stream, manifest, Core.PathOptional.value(resource_directory));
					if (manifest_file !== null) {
						JSON.write_fs(manifest_file, manifest.json);
					}
					return;
				}

			}

			export namespace PopCapDZ {

				export function pack_fs(
					package_file: string,
					manifest_file: string,
					resource_directory: string,
					package_data_buffer: Core.ByteListView | bigint,
				): void {
					let package_data_buffer_if = typeof package_data_buffer === 'bigint' ? Core.ByteArray.alloc(Core.Size.value(package_data_buffer)) : null;
					let package_data_buffer_view = package_data_buffer instanceof Core.ByteListView ? package_data_buffer : package_data_buffer_if!.view();
					let package_stream = Core.ByteStreamView.look(package_data_buffer_view);
					let manifest = Core.Tool.Package.PopCapDZ.Information.Package.json(JSON.read_fs<Core.Tool.Package.PopCapDZ.Information.JS_N.Package>(manifest_file));
					Core.Tool.Package.PopCapDZ.Pack.pack(package_stream, manifest, Core.Path.value(resource_directory));
					FileSystem.write_file(package_file, package_stream.stream_view());
					return;
				}

				export function unpack_fs(
					package_file: string,
					manifest_file: null | string,
					resource_directory: null | string,
				): void {
					let package_data = FileSystem.read_file(package_file);
					let package_stream = Core.ByteStreamView.look(package_data.view());
					let manifest = Core.Tool.Package.PopCapDZ.Information.Package.default();
					Core.Tool.Package.PopCapDZ.Unpack.unpack(package_stream, manifest, Core.PathOptional.value(resource_directory));
					if (manifest_file !== null) {
						JSON.write_fs(manifest_file, manifest.json);
					}
					return;
				}

			}

			export namespace PopCapRSGP {

				export function pack_fs(
					package_file: string,
					manifest_file: string,
					resource_directory: string,
					package_data_buffer: Core.ByteListView | bigint,
				): void {
					let package_data_buffer_if = typeof package_data_buffer === 'bigint' ? Core.ByteArray.alloc(Core.Size.value(package_data_buffer)) : null;
					let package_data_buffer_view = package_data_buffer instanceof Core.ByteListView ? package_data_buffer : package_data_buffer_if!.view();
					let package_stream = Core.ByteStreamView.look(package_data_buffer_view);
					let manifest = Core.Tool.Package.PopCapRSGP.Information.Package.json(JSON.read_fs<Core.Tool.Package.PopCapRSGP.Information.JS_N.Package>(manifest_file));
					Core.Tool.Package.PopCapRSGP.Pack.pack(package_stream, manifest, Core.Path.value(resource_directory));
					FileSystem.write_file(package_file, package_stream.stream_view());
					return;
				}

				export function unpack_fs(
					package_file: string,
					manifest_file: null | string,
					resource_directory: null | string,
				): void {
					let package_data = FileSystem.read_file(package_file);
					let package_stream = Core.ByteStreamView.look(package_data.view());
					let manifest = Core.Tool.Package.PopCapRSGP.Information.Package.default();
					Core.Tool.Package.PopCapRSGP.Unpack.unpack(package_stream, manifest, Core.PathOptional.value(resource_directory));
					if (manifest_file !== null) {
						JSON.write_fs(manifest_file, manifest.json);
					}
					return;
				}

			}

			export namespace PopCapRSB {

				export function pack_fs(
					package_file: string,
					manifest_file: string,
					resource_manifest_file: string,
					resource_directory: string,
					packet_file: null | string,
					new_packet_file: null | string,
					package_data_buffer: Core.ByteListView | bigint,
				): void {
					let package_data_buffer_if = typeof package_data_buffer === 'bigint' ? Core.ByteArray.alloc(Core.Size.value(package_data_buffer)) : null;
					let package_data_buffer_view = package_data_buffer instanceof Core.ByteListView ? package_data_buffer : package_data_buffer_if!.view();
					let package_stream = Core.ByteStreamView.look(package_data_buffer_view);
					let manifest = Core.Tool.Package.PopCapRSB.Information.Package.json(JSON.read_fs<Core.Tool.Package.PopCapRSB.Information.JS_N.Package>(manifest_file));
					Core.Tool.Package.PopCapRSB.Pack.pack(package_stream, manifest, Core.Null.default(), Core.Path.value(resource_directory), Core.PathOptional.value(packet_file), Core.PathOptional.value(new_packet_file));
					FileSystem.write_file(package_file, package_stream.stream_view());
					return;
				}

				export function unpack_fs(
					package_file: string,
					manifest_file: null | string,
					resource_manifest_file: null | string,
					resource_directory: null | string,
					packet_file: null | string,
				): void {
					let package_data = FileSystem.read_file(package_file);
					let package_stream = Core.ByteStreamView.look(package_data.view());
					let manifest = Core.Tool.Package.PopCapRSB.Information.Package.default();
					Core.Tool.Package.PopCapRSB.Unpack.unpack(package_stream, manifest, Core.Null.default(), Core.PathOptional.value(resource_directory), Core.PathOptional.value(packet_file));
					if (manifest_file !== null) {
						JSON.write_fs(manifest_file, manifest.json);
					}
					if (resource_manifest_file !== null) {
					}
					return;
				}

			}

		}

		export namespace Image {

			// ------------------------------------------------

			export type ImageSize = Core.Tool.Image.JS_ImageSize;

			export type ImagePosition = Core.Tool.Image.JS_ImagePosition;

			// ------------------------------------------------

			export namespace File {

				export function png_size_file(
					path: string,
				): ImageSize {
					return Core.Tool.Image.File.PNG.size_file(Core.Path.value(path)).value;
				}

				export function png_read_file(
					path: string,
				): Core.Tool.Image.Bitmap {
					return Core.Tool.Image.File.PNG.read_file(Core.Path.value(path));
				}

				export function png_read_file_to(
					path: string,
					image: Core.Tool.Image.BitmapView,
				): void {
					return Core.Tool.Image.File.PNG.read_file_to(Core.Path.value(path), image);
				}

				export function png_write_file(
					path: string,
					image: Core.Tool.Image.ConstantBitmapView,
				): void {
					return Core.Tool.Image.File.PNG.write_file(Core.Path.value(path), image);
				}

			}

			// ------------------------------------------------

			export const TextureChannelE = [
				'a_8',
				'rgb_888',
				'rgba_8888',
				'rgb_565_l',
				'rgba_4444_l',
				'rgba_5551_l',
				'argb_4444_l',
				'argb_8888_l',
			] as const;

			export const TextureCompressionE = [
				'rgb_etc1',
				'rgb_pvrtc4',
				'rgba_pvrtc4',
			] as const;

			export const TextureFormatE = [
				...TextureChannelE,
				...TextureCompressionE,
			] as const;

			export type TextureChannel = typeof TextureChannelE[number];

			export type TextureCompression = typeof TextureCompressionE[number];

			export type TextureFormat = typeof TextureFormatE[number];

			// ------------------------------------------------

			export function get_bpp(
				format: TextureFormat,
			): bigint {
				let result: bigint;
				switch (format) {
					case 'a_8': {
						result = 8n;
						break;
					}
					case 'rgb_888': {
						result = 24n;
						break;
					}
					case 'rgba_8888': {
						result = 32n;
						break;
					}
					case 'rgb_565_l': {
						result = 16n;
						break;
					}
					case 'rgba_4444_l': {
						result = 16n;
						break;
					}
					case 'rgba_5551_l': {
						result = 16n;
						break;
					}
					case 'argb_4444_l': {
						result = 16n;
						break;
					}
					case 'argb_8888_l': {
						result = 32n;
						break;
					}
					case 'rgb_etc1': {
						result = 4n;
						break;
					}
					case 'rgb_pvrtc4': {
						result = 4n;
						break;
					}
					case 'rgba_pvrtc4': {
						result = 4n;
						break;
					}
				}
				return result;
			}

			export function compute_data_size(
				size: ImageSize,
				format: TextureFormat,
			): bigint {
				return size[0] * size[1] * get_bpp(format) / 8n;
			}

			export function compute_data_size_n(
				size: ImageSize,
				format: Array<TextureFormat>,
			): bigint {
				let data_size = 0n;
				for (let e of format) {
					data_size += compute_data_size(size, e);
				}
				return data_size;
			}

			// ------------------------------------------------

			export function encode(
				image: Core.Tool.Image.ConstantBitmapView,
				data: Core.OByteStreamView,
				format: TextureFormat,
			): void {
				switch (format) {
					case 'a_8':
					case 'rgb_888':
					case 'rgba_8888':
					case 'rgb_565_l':
					case 'rgba_4444_l':
					case 'rgba_5551_l':
					case 'argb_4444_l':
					case 'argb_8888_l': {
						Core.Tool.Image.Encode.encode(image, data, Core.Tool.Image.TextureChannel.value(format));
						break;
					}
					case 'rgb_etc1': {
						Core.Tool.Image.Compress.ETC1.Compress.compress(image, data);
						break;
					}
					case 'rgb_pvrtc4': {
						Core.Tool.Image.Compress.PVRTC4.Compress.compress(image, data, Core.Boolean.value(false));
						break;
					}
					case 'rgba_pvrtc4': {
						Core.Tool.Image.Compress.PVRTC4.Compress.compress(image, data, Core.Boolean.value(true));
						break;
					}
				}
				return;
			}

			export function decode(
				data: Core.IByteStreamView,
				image: Core.Tool.Image.BitmapView,
				format: TextureFormat,
			): void {
				switch (format) {
					case 'a_8':
					case 'rgb_888':
					case 'rgba_8888':
					case 'rgb_565_l':
					case 'rgba_4444_l':
					case 'rgba_5551_l':
					case 'argb_4444_l':
					case 'argb_8888_l': {
						Core.Tool.Image.Decode.decode(data, image, Core.Tool.Image.TextureChannel.value(format));
						break;
					}
					case 'rgb_etc1': {
						Core.Tool.Image.Compress.ETC1.Uncompress.uncompress(data, image);
						break;
					}
					case 'rgb_pvrtc4': {
						Core.Tool.Image.Compress.PVRTC4.Uncompress.uncompress(data, image, Core.Boolean.value(false));
						break;
					}
					case 'rgba_pvrtc4': {
						Core.Tool.Image.Compress.PVRTC4.Uncompress.uncompress(data, image, Core.Boolean.value(true));
						break;
					}
				}
				return;
			}

			// ------------------------------------------------

			export function encode_n(
				image: Core.Tool.Image.ConstantBitmapView,
				data: Core.OByteStreamView,
				format: Array<TextureFormat>,
			): void {
				for (let e of format) {
					encode(image, data, e);
				}
				return;
			}

			export function decode_n(
				data: Core.IByteStreamView,
				image: Core.Tool.Image.BitmapView,
				format: Array<TextureFormat>,
			): void {
				for (let e of format) {
					decode(data, image, e);
				}
				return;
			}

			// ------------------------------------------------

			export function encode_fs(
				image_file: string,
				data_file: string,
				format: Array<TextureFormat>,
			): void {
				let image = File.png_read_file(image_file);
				let image_size = image.size().value;
				let data_size = compute_data_size_n(image_size, format);
				let data = Core.ByteArray.alloc(Core.Size.value(data_size));
				let data_stream = Core.ByteStreamView.look(data.view());
				encode_n(image.view(), data_stream, format);
				FileSystem.write_file(data_file, data_stream.stream_view());
				return;
			}

			export function decode_fs(
				data_file: string,
				image_file: string,
				size: ImageSize,
				format: Array<TextureFormat>,
			): void {
				let data = FileSystem.read_file(data_file);
				let data_stream = Core.ByteStreamView.look(data.view());
				let image = Core.Tool.Image.Bitmap.alloc(Core.Tool.Image.ImageSize.value(size));
				let image_view = image.view();
				decode_n(data_stream, image_view, format);
				File.png_write_file(image_file, image_view);
				return;
			}

			// ------------------------------------------------

		}

		export namespace Animation {

			export namespace PopCapAnimation {

				export function encode_fs(
					data_file: string,
					information_file: string,
					data_buffer: Core.ByteListView | bigint,
				): void {
					let data_buffer_if = typeof data_buffer === 'bigint' ? Core.ByteArray.alloc(Core.Size.value(data_buffer)) : null;
					let data_buffer_view = data_buffer instanceof Core.ByteListView ? data_buffer : data_buffer_if!.view();
					let data_stream = Core.ByteStreamView.look(data_buffer_view);
					let information = Core.Tool.Animation.PopCapAnimation.Information.Animation.json(JSON.read_fs<Core.Tool.Animation.PopCapAnimation.Information.JS_N.Animation>(information_file));
					Core.Tool.Animation.PopCapAnimation.Encode.encode(data_stream, information);
					FileSystem.write_file(data_file, data_stream.stream_view());
					return;
				}

				export function decode_fs(
					data_file: string,
					information_file: string,
				): void {
					let data = FileSystem.read_file(data_file);
					let data_stream = Core.ByteStreamView.look(data.view());
					let information = Core.Tool.Animation.PopCapAnimation.Information.Animation.default();
					Core.Tool.Animation.PopCapAnimation.Decode.decode(data_stream, information);
					JSON.write_fs(information_file, information.json);
					return;
				}

			}

		}

		export namespace Audio {

			export namespace WwiseSoundBank {

				export function pack_fs(
					package_file: string,
					manifest_file: string,
					extra_directory: string,
					package_data_buffer: Core.ByteListView | bigint,
				): void {
					let package_data_buffer_if = typeof package_data_buffer === 'bigint' ? Core.ByteArray.alloc(Core.Size.value(package_data_buffer)) : null;
					let package_data_buffer_view = package_data_buffer instanceof Core.ByteListView ? package_data_buffer : package_data_buffer_if!.view();
					let package_stream = Core.ByteStreamView.look(package_data_buffer_view);
					let manifest = Core.Tool.Audio.WwiseSoundBank.Information.Package.json(JSON.read_fs<Core.Tool.Audio.WwiseSoundBank.Information.JS_N.Package>(manifest_file));
					Core.Tool.Audio.WwiseSoundBank.Pack.pack(package_stream, manifest, Core.Path.value(extra_directory));
					FileSystem.write_file(package_file, package_stream.stream_view());
					return;
				}

				export function unpack_fs(
					package_file: string,
					manifest_file: null | string,
					extra_directory: null | string,
				): void {
					let package_data = FileSystem.read_file(package_file);
					let package_stream = Core.ByteStreamView.look(package_data.view());
					let manifest = Core.Tool.Audio.WwiseSoundBank.Information.Package.default();
					Core.Tool.Audio.WwiseSoundBank.Unpack.unpack(package_stream, manifest, Core.PathOptional.value(extra_directory));
					if (manifest_file !== null) {
						JSON.write_fs(manifest_file, manifest.json);
					}
					return;
				}

			}

			export namespace WwiseEncodedMedia {

				export function decode_fs(
					ripe_file: string,
					raw_file: string,
					ffmpeg_file: string,
					ww2ogg_file: string,
					ww2ogg_pcb_file: string,
					temp_directory: string,
				): void {
					let ripe_data = FileSystem.read_file(ripe_file);
					let raw_data = Core.Tool.Audio.WwiseEncodedMedia.Decode.decode(ripe_data.view(), Core.Path.value(ffmpeg_file), Core.Path.value(ww2ogg_file), Core.Path.value(ww2ogg_pcb_file), Core.Path.value(temp_directory));
					FileSystem.write_file(raw_file, raw_data.view());
					return;
				}

			}

		}

		export namespace Other {

			export namespace PopCapRTON {

				export function encode_fs(
					json_file: string,
					rton_file: string,
					enable_string_index: boolean,
					enable_rtid: boolean,
					is_whole_rton: boolean,
					rton_data_buffer: Core.ByteListView | bigint,
				): void {
					let rton_data_buffer_if = typeof rton_data_buffer === 'bigint' ? Core.ByteArray.alloc(Core.Size.value(rton_data_buffer)) : null;
					let rton_data_buffer_view = rton_data_buffer instanceof Core.ByteListView ? rton_data_buffer : rton_data_buffer_if!.view();
					let json = JSON.read_fs<Core.Tool.Other.PopCapRTON.JS_ValidValue>(json_file);
					let rton_stream = Core.ByteStreamView.look(rton_data_buffer_view);
					Core.Tool.Other.PopCapRTON.Encode.encode(json, rton_stream, Core.Boolean.value(enable_string_index), Core.Boolean.value(enable_rtid), Core.Boolean.value(is_whole_rton));
					FileSystem.write_file(rton_file, rton_stream.stream_view());
					return;
				}

				export function decode_fs(
					rton_file: string,
					json_file: string,
					is_whole_rton: boolean,
				): void {
					let rton_data = FileSystem.read_file(rton_file);
					let rton_stream = Core.ByteStreamView.look(rton_data.view());
					let json = Core.JSON.Value.default<Core.Tool.Other.PopCapRTON.JS_ValidValue>();
					Core.Tool.Other.PopCapRTON.Decode.decode(rton_stream, json, Core.Boolean.value(is_whole_rton));
					JSON.write_fs(json_file, json);
					return;
				}

				export function encrypt_fs(
					plain_file: string,
					cipher_file: string,
					key: string,
				): void {
					let plain_data = FileSystem.read_file(plain_file);
					let cipher_size = Core.Tool.Other.PopCapRTON.Encrypt.compute_cipher_size(plain_data.size());
					let cipher_data = Core.ByteArray.alloc(cipher_size);
					let plain_stream = Core.ByteStreamView.look(plain_data.view());
					let cipher_stream = Core.ByteStreamView.look(cipher_data.view());
					Core.Tool.Other.PopCapRTON.Encrypt.encrypt(plain_stream, cipher_stream, Core.String.value(key));
					FileSystem.write_file(cipher_file, cipher_stream.stream_view());
					return;
				}

				export function decrypt_fs(
					cipher_file: string,
					plain_file: string,
					key: string,
				): void {
					let cipher_data = FileSystem.read_file(cipher_file);
					let plain_size = Core.Tool.Other.PopCapRTON.Decrypt.compute_plain_size(cipher_data.size());
					let plain_data = Core.ByteArray.alloc(plain_size);
					let cipher_stream = Core.ByteStreamView.look(cipher_data.view());
					let plain_stream = Core.ByteStreamView.look(plain_data.view());
					Core.Tool.Other.PopCapRTON.Decrypt.decrypt(cipher_stream, plain_stream, Core.String.value(key));
					FileSystem.write_file(plain_file, plain_stream.stream_view());
					return;
				}

				export function encode_then_encrypt_fs(
					json_file: string,
					rton_file: string,
					enable_string_index: boolean,
					enable_rtid: boolean,
					is_whole_rton: boolean,
					key: string,
					rton_data_buffer: Core.ByteListView | bigint,
				): void {
					let rton_data_buffer_if = typeof rton_data_buffer === 'bigint' ? Core.ByteArray.alloc(Core.Size.value(rton_data_buffer)) : null;
					let rton_data_buffer_view = rton_data_buffer instanceof Core.ByteListView ? rton_data_buffer : rton_data_buffer_if!.view();
					let json = JSON.read_fs<Core.Tool.Other.PopCapRTON.JS_ValidValue>(json_file);
					let rton_stream = Core.ByteStreamView.look(rton_data_buffer_view);
					Core.Tool.Other.PopCapRTON.Encode.encode(json, rton_stream, Core.Boolean.value(enable_string_index), Core.Boolean.value(enable_rtid), Core.Boolean.value(is_whole_rton));
					let plain_stream = Core.ByteStreamView.look(rton_stream.stream_view());
					let cipher_size = Core.Tool.Other.PopCapRTON.Encrypt.compute_cipher_size(plain_stream.size());
					let cipher_data = Core.ByteArray.alloc(cipher_size);
					let cipher_stream = Core.ByteStreamView.look(cipher_data.view());
					Core.Tool.Other.PopCapRTON.Encrypt.encrypt(plain_stream, cipher_stream, Core.String.value(key));
					FileSystem.write_file(rton_file, cipher_stream.stream_view());
					return;
				}

				export function decrypt_then_decode_fs(
					rton_file: string,
					json_file: string,
					is_whole_rton: boolean,
					key: string,
				): void {
					let cipher_data = FileSystem.read_file(rton_file);
					let plain_size = Core.Tool.Other.PopCapRTON.Decrypt.compute_plain_size(cipher_data.size());
					let plain_data = Core.ByteArray.alloc(plain_size);
					let cipher_stream = Core.ByteStreamView.look(cipher_data.view());
					let plain_stream = Core.ByteStreamView.look(plain_data.view());
					Core.Tool.Other.PopCapRTON.Decrypt.decrypt(cipher_stream, plain_stream, Core.String.value(key));
					let rton_stream = Core.ByteStreamView.look(plain_stream.stream_view());
					let json = Core.JSON.Value.default<Core.Tool.Other.PopCapRTON.JS_ValidValue>();
					Core.Tool.Other.PopCapRTON.Decode.decode(rton_stream, json, Core.Boolean.value(is_whole_rton));
					JSON.write_fs(json_file, json);
					return;
				}

			}

			export namespace PopCapZLib {

				export function compress_fs(
					raw_file: string,
					ripe_file: string,
					level: Data.Compress.ZLib.CompressionLevel = 9n,
				): void {
					let raw_data = FileSystem.read_file(raw_file);
					let ripe_size_bound = Core.Tool.Other.PopCapZLib.Compress.compute_ripe_size_bound(raw_data.size());
					let ripe_data = Core.ByteArray.alloc(ripe_size_bound);
					let raw_stream = Core.ByteStreamView.look(raw_data.view());
					let ripe_stream = Core.ByteStreamView.look(ripe_data.view());
					Core.Tool.Other.PopCapZLib.Compress.compress(raw_stream, ripe_stream, Core.Size.value(level));
					FileSystem.write_file(ripe_file, ripe_stream.stream_view());
					return;
				}

				export function uncompress_fs(
					ripe_file: string,
					raw_file: string,
				): void {
					let ripe_data = FileSystem.read_file(ripe_file);
					let raw_size = Core.Tool.Other.PopCapZLib.Uncompress.compute_raw_size(ripe_data.view());
					let raw_data = Core.ByteArray.alloc(raw_size);
					let ripe_stream = Core.ByteStreamView.look(ripe_data.view());
					let raw_stream = Core.ByteStreamView.look(raw_data.view());
					Core.Tool.Other.PopCapZLib.Uncompress.uncompress(ripe_stream, raw_stream);
					FileSystem.write_file(raw_file, raw_stream.stream_view());
					return;
				}

			}

			export namespace PvZ2CHSRSBTextureAlphaIndex {

				// ------------------------------------------------

				export type BitCount = 1 | 2 | 3 | 4;

				export function compute_bit_count(
					value_count: number,
				): BitCount {
					if (value_count <= 0b1 || value_count > 0b10000) {
						throw new MyError(`invalue value count`);
					}
					let bit_count: BitCount;
					if (value_count <= 0b10) {
						bit_count = 1;
					} else if (value_count <= 0b100) {
						bit_count = 2;
					} else if (value_count <= 0b1000) {
						bit_count = 3;
					} else {
						bit_count = 4;
					}
					return bit_count;
				}

				// ------------------------------------------------

				export function compute_data_size_with_index_list(
					size: Image.ImageSize,
					index_count: number,
				): bigint {
					let bit_count = compute_bit_count(index_count);
					return 1n + BigInt(index_count === 2 ? 0 : index_count) + size[0] * size[1] * BigInt(bit_count) / 8n;
				}

				export function evaluate_index_list(
					image: Core.Tool.Image.ConstantBitmapView,
				): Core.Tool.Other.PvZ2CHSRSBTextureAlphaIndex.JS_IndexList {
					let image_size = image.size().value;
					let image_data = Core.ByteArray.alloc(Core.Size.value(image_size[0] * image_size[1] * 8n / 8n));
					let image_stream = Core.ByteStreamView.look(image_data.view());
					Image.encode(image, image_stream, 'a_8');
					let alpha_count: Record<number, number> = {};
					for (let e of new Uint8Array(image_stream.stream_view().value)) {
						let alpha_4 = (e >> 4) & ~(~0 << 4);
						alpha_count[alpha_4] = (alpha_count[alpha_4] || 0) + 1;
					}
					let index_list = Object.keys(alpha_count).map(BigInt);
					if (index_list.length <= 2) {
						if (!index_list.includes(0b0000n)) {
							index_list.push(0b0000n);
						}
						if (!index_list.includes(0b1111n)) {
							index_list.push(0b1111n);
						}
						if (index_list.length === 2) {
							index_list = [0b0000n, 0b1111n];
						}
					}
					return index_list;
				}

				// ------------------------------------------------

				export function encode_with_map(
					image: Core.Tool.Image.ConstantBitmapView,
					data: Core.OByteStreamView,
					index: Core.Tool.Other.PvZ2CHSRSBTextureAlphaIndex.JS_IndexList,
				): void {
					let bit_count = compute_bit_count(index.length);
					if (bit_count === 1) {
						data.write(Core.Byte.value(0n));
					} else {
						data.write(Core.Byte.value(BigInt(index.length)));
						for (let e of index) {
							data.write(Core.Byte.value(e));
						}
					}
					Core.Tool.Other.PvZ2CHSRSBTextureAlphaIndex.Encode.encode(image, data, index);
					return;
				}

				export function decode_with_map(
					data: Core.IByteStreamView,
					image: Core.Tool.Image.BitmapView,
				): void {
					let index_count = data.read().value;
					let index: Core.Tool.Other.PvZ2CHSRSBTextureAlphaIndex.JS_IndexList;
					if (index_count === 0n) {
						index = [0b0000n, 0b1111n];
					} else {
						index = [];
						for (let i = 0n; i < index_count; ++i) {
							index.push(data.read().value);
						}
					}
					Core.Tool.Other.PvZ2CHSRSBTextureAlphaIndex.Decode.decode(data, image, index);
					return;
				}

				// ------------------------------------------------

			}

		}

	}

	export namespace System {

		// ------------------------------------------------

		export const name = (() => {
			if (TwinKleS.Core.System.Windows !== undefined) {
				return 'windows';
			}
			if (TwinKleS.Core.System.Linux !== undefined) {
				return 'linux';
			}
			throw new MyError("unknown system");
		})();

		// ------------------------------------------------

		export function exit(
			code: bigint,
		): void {
			return TwinKleS.Core.System.exit(Core.IntegerS.value(code));
		}

		export function sleep(
			time: bigint,
		): void {
			return TwinKleS.Core.System.sleep(Core.Size.value(time));
		}

		// ------------------------------------------------

		export function system(
			command: string,
		): bigint {
			return TwinKleS.Core.System.system(TwinKleS.Core.String.value(command)).value;
		}

		export function process(
			path: string,
			argument: Array<string>,
		): bigint {
			return TwinKleS.Core.System.process(TwinKleS.Core.Path.value(path), TwinKleS.Core.StringList.value(argument)).value;
		}

		// ------------------------------------------------

		export function pause(
		): void {
			return TwinKleS.Core.System.pause();
		}

		export function input(
		): string {
			return TwinKleS.Core.System.input().value;
		}

		export function output(
			text: string,
		): void {
			return TwinKleS.Core.System.output(TwinKleS.Core.String.value(text));
		}

		// ------------------------------------------------

		export namespace Windows {

			// ------------------------------------------------

			export enum InputConsoleMode {
				ENABLE_ECHO_INPUT = 0x0004,
				ENABLE_INSERT_MODE = 0x0020,
				ENABLE_LINE_INPUT = 0x0002,
				ENABLE_MOUSE_INPUT = 0x0010,
				ENABLE_PROCESSED_INPUT = 0x0001,
				ENABLE_QUICK_EDIT_MODE = 0x0040,
				ENABLE_WINDOW_INPUT = 0x0008,
				ENABLE_VIRTUAL_TERMINAL_INPUT = 0x0200,
			};

			export enum OutputConsoleMode {
				ENABLE_PROCESSED_OUTPUT = 0x0001,
				ENABLE_WRAP_AT_EOL_OUTPUT = 0x0002,
				ENABLE_VIRTUAL_TERMINAL_PROCESSING = 0x0004,
				DISABLE_NEWLINE_AUTO_RETURN = 0x0008,
				ENABLE_LVB_GRID_WORLDWIDE = 0x0010,
			};

			// ------------------------------------------------

			export function get_standard_console_mode(
				handle_name: Core.System.Windows.JS_StandardHandleName,
			): number {
				return Number(TwinKleS.Core.System.Windows.get_standard_console_mode(Core.String.value(handle_name)).value);
			}

			export function set_standard_console_mode(
				handle_name: Core.System.Windows.JS_StandardHandleName,
				mode: number,
			): void {
				return TwinKleS.Core.System.Windows.set_standard_console_mode(Core.String.value(handle_name), Core.IntegerU32.value(BigInt(mode)));
			}

			// ------------------------------------------------

			export function select_file_by_dialog(
				pick_folder: boolean,
				multiple: boolean,
			): Array<string> {
				return TwinKleS.Core.System.Windows.select_file_by_dialog(Core.Boolean.value(pick_folder), Core.Boolean.value(multiple)).value;
			}

			// ------------------------------------------------

		}

		// ------------------------------------------------

	}

	export namespace _Detail {

		export function evaluate(
			script: string,
			name: string = '<!evaluate>',
		): any {
			let script_s = Core.String.value(script);
			return Core._Detail.evaluate(Core._Detail.cast_String_to_CharacterListView(script_s), Core.String.value(name));
		}

		export function evaluate_fs(
			script_file: string,
			name: string = script_file,
		): any {
			let script = FileSystem.read_file(script_file);
			return Core._Detail.evaluate(Core._Detail.cast_ByteListView_to_CharacterListView(script.view()), Core.String.value(name));
		}

	}

}