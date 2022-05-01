namespace TwinKleS {

	// ------------------------------------------------

	/** 版本编号 */
	export const k_version = 14;

	// ------------------------------------------------

	/** 错误类 */
	export class MyError {

		private message: string;
		private stack: string;

		constructor(
			message: string,
		) {
			let stack = new Error().stack!;
			stack = stack.substring(stack.indexOf('\n') + 1, stack.length - 1);
			this.message = message;
			this.stack = stack;
		}

		toString(): string {
			return `${this.message}\n${this.stack}`;
		}

	}

	// ------------------------------------------------

	/** 主函数实现 */
	export namespace Main {

		// ------------------------------------------------

		namespace Detail {

			// ------------------------------------------------

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

			export function read_json<ConstraintT extends Core.JSON.JS_Value>(
				file: string,
			): ConstraintT {
				let data = Core.FileSystem.read_file(Core.Path.value(file));
				let stream = Core.CharacterStreamView.look(Core._Detail.cast_ByteListView_to_CharacterListView(data.view()));
				let json = Core.JSON.Value.default<ConstraintT>();
				Core.JSON.Read.read(stream, json);
				return json.value;
			}

			// ------------------------------------------------

			export function evaluate(
				script_file: string,
			): any {
				let script = Core.FileSystem.read_file(Core.Path.value(script_file));
				return Core._Detail.evaluate(Core._Detail.cast_ByteListView_to_CharacterListView(script.view()), Core.String.value(script_file));
			}

			// ------------------------------------------------

			export function output(
				message: string,
			): void {
				TwinKleS.Core.System.output(TwinKleS.Core.String.value(`${message}\n`));
				return;
			}

			// ------------------------------------------------

		}

		// ------------------------------------------------

		type ModuleManifest = {
			module: Array<string>;
			entry: null | string;
		};

		type ModuleConfig = Record<string, Core.JSON.JS_Value>;

		type Injector = (config: null | ModuleConfig) => void;

		type Entry = (config: null | ModuleConfig, argument: Array<string>) => void;

		type ModuleEvaluateResult = undefined | {
			injector?: Injector;
			entry?: Entry;
		};

		// ------------------------------------------------

		function load_module(
			manifest: ModuleManifest,
			main_directory: string,
		): [Entry, null | ModuleConfig] | null {
			if (!Detail.exist_directory(main_directory)) {
				throw new MyError(`main directory is not found : <${main_directory}>`);
			}
			let entry: [Entry, null | ModuleConfig] | null = null;
			if (manifest.entry !== null && !manifest.module.includes(manifest.entry)) {
				throw new MyError(`entry module is invalid : <${manifest.entry}>`);
			}
			for (let module of manifest.module) {
				let script_file = `${main_directory}/${module}.js`;
				let config_file = `${main_directory}/${module}.json`;
				if (!Detail.exist_file(script_file)) {
					throw new MyError(`module script file not found : <${module}>`);
				}
				let config: null | ModuleConfig = null;
				if (Detail.exist_file(config_file)) {
					let raw_module_config = Detail.read_json(config_file);
					if (typeof raw_module_config !== 'object' || raw_module_config === null || (raw_module_config as Object).constructor.name !== 'Object') {
						throw new MyError(`module config must be object : <${module}>`);
					}
					config = raw_module_config as ModuleConfig;
				}
				let evaluate_result = Detail.evaluate(script_file) as ModuleEvaluateResult;
				if (evaluate_result !== undefined) {
					if (evaluate_result.injector !== undefined) {
						evaluate_result.injector(config);
					}
				}
				if (module === manifest.entry) {
					if (evaluate_result !== undefined && evaluate_result.entry !== undefined) {
						entry = [evaluate_result.entry as Entry, config];
					} else {
						throw new MyError(`module is loaded, but entry function is not found : <${module}>`);
					}
				}
			}
			return entry;
		}

		// ------------------------------------------------

		export let g_home_directory: string = null!;

		export function path_at_home(
			format: string,
		): string {
			return format.replaceAll(/<home>/g, g_home_directory);
		}

		// ------------------------------------------------

		export let g_module_manifest: ModuleManifest = null!;

		export function main(
			script_path: null | string,
			argument: Array<string>,
		): null | string {
			Detail.output(`TwinKleS.ToolKit.Script ${k_version}`);
			try {
				if (script_path === null) {
					throw new MyError(`must run as file`);
				}
				let script_path_match = /^(.+)\/script\/main.js$/.exec(script_path.replaceAll('\\', '/'));
				if (script_path_match === null) {
					throw new MyError(`script path error`);
				}
				g_home_directory = script_path_match[1];
				let begin_time = Date.now();
				let entry = load_module(g_module_manifest, `${g_home_directory}/script`);
				let end_time = Date.now();
				Detail.output(`all module loaded in ${end_time - begin_time}ms`);
				entry?.[0](entry[1], argument);
			} catch (e: any) {
				if (e instanceof Error) {
					return `${e}\n${e.stack}`;
				} else {
					return `${e}`;
				}
			}
			return null;
		}

		// ------------------------------------------------

	}

	// ------------------------------------------------

}

TwinKleS.Main.g_module_manifest = {
	module: [
		`utility/Timer`,
		`utility/TypeUtility`,
		`utility/PathUtility`,
		`utility/Check`,
		`utility/TextGenerator`,
		`utility/VirtualTerminalSequences`,
		`utility/XML`,
		`CoreX/CoreX`,
		`io/Input`,
		`io/Output`,
		`Language/Language`,
		`Support/PopCapPAK/ResourcePack`,
		`Support/PopCapDZ/ResourcePack`,
		`Support/Atlas/AutoPack`,
		`Support/Atlas/Atlas`,
		`Support/PopCapTexture/Encode`,
		`Support/PopCapAnimation/Convert/common`,
		`Support/PopCapAnimation/Convert/Flash/common`,
		`Support/PopCapAnimation/Convert/Flash/From`,
		`Support/PopCapAnimation/Convert/Flash/To`,
		`Support/PopCapAnimation/Convert/Flash/SourceManager`,
		`Support/PvZ2/JSONGenericGetter/JSONGenericGetter`,
		`Support/PvZ2/LawnStringText/LawnStringText`,
		`Support/PvZ2/RSB/ResourceManifest/Convert`,
		`Support/PvZ2/RSB/ResourceManifest/ResourceManifest`,
		`Support/PvZ2/RSB/ResourceManifest/OfficialResourceManifest`,
		`Support/PvZ2/RSB/ResourceExtract/ResourceExtract`,
		`Executor/Executor`,
		`Entry/Entry`,
		`Entry/method/js`,
		`Entry/method/json`,
		`Entry/method/data.base64`,
		`Entry/method/data.xor`,
		`Entry/method/data.zlib`,
		`Entry/method/data.hash`,
		`Entry/method/package.popcap_pak`,
		`Entry/method/package.popcap_dz`,
		`Entry/method/package.popcap_rsgp`,
		`Entry/method/package.popcap_rsb`,
		`Entry/method/image.atlas`,
		`Entry/method/image.popcap_texture`,
		`Entry/method/animation.popcap_animation`,
		`Entry/method/audio.wwise_sound_bank`,
		`Entry/method/audio.wwise_encoded_media`,
		`Entry/method/other.popcap_rton`,
		`Entry/method/other.popcap_zlib`,
		`Entry/method/other.pvz2.lawn_string_text`,
		`Entry/method/expand`,
	],
	entry: `Entry/Entry`,
};

(TwinKleS.Main.main);