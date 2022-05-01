/** PAM转换自Flash */
namespace TwinKleS.Support.PopCapAnimation.Convert.Flash.To {

	// ------------------------------------------------

	function parse_transform_origin(
		x_Matrix: Core.XML.JS_Element,
	): [number, number] {
		return [
			Number(x_Matrix.attribute.x || '0'),
			Number(x_Matrix.attribute.y || '0'),
		];
	}

	function parse_transform(
		x_Matrix: Core.XML.JS_Element,
	): Transform {
		return [
			Number(x_Matrix.attribute.a || '1'),
			Number(x_Matrix.attribute.b || '0'),
			Number(x_Matrix.attribute.c || '0'),
			Number(x_Matrix.attribute.d || '1'),
			Number(x_Matrix.attribute.tx || '0'),
			Number(x_Matrix.attribute.ty || '0'),
		];
	}

	function parse_color(
		x_Matrix: Core.XML.JS_Element,
	): Color {
		let compute = (multiplier_s: string | undefined, offset_s: string | undefined) => (Math.max(0, Math.min(255, Number(multiplier_s || '1') * 255 + Number(offset_s || '0'))) / 255);
		return [
			compute(x_Matrix.attribute.redMultiplier, x_Matrix.attribute.redOffset),
			compute(x_Matrix.attribute.greenMultiplier, x_Matrix.attribute.greenOffset),
			compute(x_Matrix.attribute.blueMultiplier, x_Matrix.attribute.blueOffset),
			compute(x_Matrix.attribute.alphaMultiplier, x_Matrix.attribute.alphaOffset),
		];
	}

	function parse_image_document(
		x_DOMSymbolItem: Core.XML.JS_Element,
		index: number,
	): Transform {
		if (x_DOMSymbolItem.name !== 'DOMSymbolItem') {
			throw new MyError(``);
		}
		if (x_DOMSymbolItem.attribute.name !== `image/image_${index + 1}`) {
			throw new MyError(``);
		}
		let x_timeline_list = XML.find_child_element(x_DOMSymbolItem, 'timeline');
		if (x_timeline_list.length !== 1) {
			throw new MyError(``);
		}
		let x_timeline = x_timeline_list[0];
		let x_DOMTimeline_list = XML.find_child_element(x_timeline, 'DOMTimeline');
		if (x_DOMTimeline_list.length !== 1) {
			throw new MyError(``);
		}
		let x_DOMTimeline = x_DOMTimeline_list[0];
		if (x_DOMTimeline.attribute.name !== `image_${index + 1}`) {
			throw new MyError(``);
		}
		let x_layers_list = XML.find_child_element(x_DOMTimeline, 'layers');
		if (x_layers_list.length !== 1) {
			throw new MyError(``);
		}
		let x_layers = x_layers_list[0];
		let x_DOMLayer_list = XML.find_child_element(x_layers, 'DOMLayer');
		if (x_DOMLayer_list.length !== 1) {
			throw new MyError(``);
		}
		let x_DOMLayer = x_DOMLayer_list[0];
		let x_frames_list = XML.find_child_element(x_DOMLayer, 'frames');
		if (x_frames_list.length !== 1) {
			throw new MyError(``);
		}
		let x_frames = x_frames_list[0];
		let x_DOMFrame_list = XML.find_child_element(x_frames, 'DOMFrame');
		if (x_DOMFrame_list.length !== 1) {
			throw new MyError(``);
		}
		let x_DOMFrame = x_DOMFrame_list[0];
		let x_elements_list = XML.find_child_element(x_DOMFrame, 'elements');
		if (x_elements_list.length !== 1) {
			throw new MyError(``);
		}
		let x_elements = x_elements_list[0];
		let x_DOMSymbolInstance_list = XML.find_child_element(x_elements, 'DOMSymbolInstance');
		if (x_DOMSymbolInstance_list.length !== 1) {
			throw new MyError(``);
		}
		let x_DOMSymbolInstance = x_DOMSymbolInstance_list[0];
		if (x_DOMSymbolInstance.attribute.libraryItemName !== `source/source_${index + 1}`) {
			throw new MyError(``);
		}
		let x_matrix_list = XML.find_child_element(x_DOMSymbolInstance, 'matrix');
		if (x_matrix_list.length !== 1) {
			throw new MyError(``);
		}
		let x_matrix = x_matrix_list[0];
		let x_Matrix_list = XML.find_child_element(x_matrix, 'Matrix');
		if (x_Matrix_list.length !== 1) {
			throw new MyError(``);
		}
		let x_Matrix = x_Matrix_list[0];
		let x_transformationPoint_list = XML.find_child_element(x_DOMSymbolInstance, 'transformationPoint');
		if (x_transformationPoint_list.length !== 1) {
			throw new MyError(``);
		}
		let x_transformationPoint = x_transformationPoint_list[0];
		let x_Point_list = XML.find_child_element(x_transformationPoint, 'Point');
		if (x_Point_list.length !== 1) {
			throw new MyError(``);
		}
		let x_Point = x_Point_list[0];
		let transform = parse_transform(x_Matrix);
		let transform_origin = parse_transform_origin(x_Point);
		if (transform[4] !== -transform_origin[0] || transform[5] !== -transform_origin[1]) {
			throw new MyError(``);
		}
		return transform;
	}

	function parse_sprite_document(
		x_DOMSymbolItem: Core.XML.JS_Element,
		index: number | 'main',
	): Array<Core.Tool.Animation.PopCapAnimation.Information.JS_N.Frame> {
		let model: {
			index: bigint;
			resource: bigint;
			sprite: boolean;
			frame_start: bigint;
			frame_duration: bigint;
			color: Color;
		} | null = null;
		let result: Array<Core.Tool.Animation.PopCapAnimation.Information.JS_N.Frame> = new Array(0);
		if (x_DOMSymbolItem.name !== 'DOMSymbolItem') {
			throw new MyError(``);
		}
		if (x_DOMSymbolItem.attribute.name !== (index === 'main' ? `main_sprite` : `sprite/sprite_${index + 1}`)) {
			throw new MyError(``);
		}
		let x_timeline_list = XML.find_child_element(x_DOMSymbolItem, 'timeline');
		if (x_timeline_list.length !== 1) {
			throw new MyError(``);
		}
		let x_timeline = x_timeline_list[0];
		let x_DOMTimeline_list = XML.find_child_element(x_timeline, 'DOMTimeline');
		if (x_DOMTimeline_list.length !== 1) {
			throw new MyError(``);
		}
		let x_DOMTimeline = x_DOMTimeline_list[0];
		if (x_DOMTimeline.attribute.name !== (index === 'main' ? `main_sprite` : `sprite_${index + 1}`)) {
			throw new MyError(``);
		}
		let x_layers_list = XML.find_child_element(x_DOMTimeline, 'layers');
		if (x_layers_list.length !== 1) {
			throw new MyError(``);
		}
		let x_layers = x_layers_list[0];
		let x_DOMLayer_list = XML.find_child_element(x_layers, 'DOMLayer');
		x_DOMLayer_list.reverse();
		let layer_count = 0;
		let get_frame_at = (index: number) => {
			if (result[index] === undefined) {
				result[index] = {
					label: null,
					stop: false,
					command: [],
					remove: [],
					append: [],
					change: [],
				};
			}
			return result[index];
		};
		x_DOMLayer_list.forEach((x_DOMLayer) => {
			let x_frames_list = XML.find_child_element(x_DOMLayer, 'frames');
			if (x_frames_list.length !== 1) {
				throw new MyError(``);
			}
			let x_frames = x_frames_list[0];
			let x_DOMFrame_list = XML.find_child_element(x_frames, 'DOMFrame');
			let colse_current_model_if_need = () => {
				if (model !== null) {
					let target_frame = get_frame_at(Number(model.frame_start + model.frame_duration));
					target_frame.remove.push({
						index: model.index,
					});
					model = null;
				}
			};
			x_DOMFrame_list.forEach((x_DOMFrame) => {
				let frame_index = BigInt(x_DOMFrame.attribute.index);
				let frame_duration = BigInt(x_DOMFrame.attribute.duration || '1');
				let transform: Core.Tool.Animation.PopCapAnimation.Information.JS_N.VariantTransform;
				let color: Color;
				let x_elements_list = XML.find_child_element(x_DOMFrame, 'elements');
				if (x_elements_list.length === 0) {
					colse_current_model_if_need();
					return;
				}
				if (x_elements_list.length !== 1) {
					throw new MyError(``);
				}
				let x_elements = x_elements_list[0];
				let x_DOMSymbolInstance_list = XML.find_child_element(x_elements, 'DOMSymbolInstance');
				if (x_DOMSymbolInstance_list.length === 0) {
					return;
				}
				if (x_DOMSymbolInstance_list.length !== 1) {
					throw new MyError(``);
				}
				let x_DOMSymbolInstance = x_DOMSymbolInstance_list[0];
				let name_match = /(image|sprite)\/(image|sprite)_([0-9]+)/.exec(x_DOMSymbolInstance.attribute.libraryItemName);
				if (name_match === null) {
					throw new MyError(`invalid name`);
				}
				if (name_match[1] !== name_match[2]) {
					throw new MyError(`invalid name x`);
				}
				let current_instance = {
					resource: BigInt(name_match[3]) - 1n,
					sprite: name_match[1] === 'sprite',
				}
				{
					let x_matrix_list = XML.find_child_element(x_DOMSymbolInstance, 'matrix');
					if (x_matrix_list.length === 0) {
						transform = [0.0, 0.0];
					} else if (x_matrix_list.length === 1) {
						let x_matrix = x_matrix_list[0];
						let x_Matrix_list = XML.find_child_element(x_matrix, 'Matrix');
						if (x_Matrix_list.length !== 1) {
							throw new MyError(``);
						}
						let x_Matrix = x_Matrix_list[0];
						transform = comput_variant_transform_from_standard(parse_transform(x_Matrix));
					} else {
						throw new MyError(``);
					}
				}
				{
					let x_color_list = XML.find_child_element(x_DOMSymbolInstance, 'color');
					if (x_color_list.length === 0) {
						color = [...k_initial_color];
					} else if (x_color_list.length === 1) {
						let x_color = x_color_list[0];
						let x_Color_list = XML.find_child_element(x_color, 'Color');
						if (x_Color_list.length !== 1) {
							throw new MyError(``);
						}
						let x_Color = x_Color_list[0];
						color = parse_color(x_Color);
					} else {
						throw new MyError(``);
					}
				}
				let target_frame = get_frame_at(Number(frame_index));
				if (model === null) {
					model = {
						index: BigInt(layer_count),
						...current_instance,
						frame_start: frame_index,
						frame_duration: frame_duration,
						color: [...k_initial_color],
					};
					target_frame.append.push({
						index: model.index,
						name: null,
						...current_instance,
					});
					++layer_count;
				} else {
					if (current_instance.resource !== model.resource || current_instance.sprite !== model.sprite) {
						throw new MyError(``);
					}
				}
				model.frame_start = frame_index;
				model.frame_duration = frame_duration;
				let color_is_changed = !(model.color[0] === color[0] && model.color[1] === color[1] && model.color[2] === color[2] && model.color[3] === color[3]);
				if (color_is_changed) {
					model.color = color;
				}
				target_frame.change.push({
					index: model.index,
					transform,
					color: color_is_changed ? color : null,
				});
			});
			colse_current_model_if_need();
		});
		for (let i = 0; i < result.length; ++i) {
			if (result[i] === undefined) {
				result[i] = {
					label: null,
					stop: false,
					command: [],
					remove: [],
					append: [],
					change: [],
				};
			}
		}
		return result.slice(0, -1);
	}

	export function to(
		flash: FlashPackage,
	): Core.Tool.Animation.PopCapAnimation.Information.JS_N.Animation {
		let x_DOMDocument = flash.document;
		if (x_DOMDocument.name !== 'DOMDocument') {
			throw new MyError(``);
		}
		{
			let x_media_list = XML.find_child_element(x_DOMDocument, 'media');
			if (x_media_list.length !== 1) {
				throw new MyError(``);
			}
			let x_media = x_media_list[0];
			let x_DOMBitmapItem_list = XML.find_child_element(x_media, 'DOMBitmapItem');
		}
		{
			let x_symbols_list = XML.find_child_element(x_DOMDocument, 'symbols');
			if (x_symbols_list.length !== 1) {
				throw new MyError(``);
			}
			let x_symbols = x_symbols_list[0];
			let x_Include_list = XML.find_child_element(x_symbols, 'Include');
		}
		let main_sprite_frame = parse_sprite_document(flash.library.main_sprite, 'main');
		{
			let x_timelines_list = XML.find_child_element(x_DOMDocument, 'timelines');
			if (x_timelines_list.length !== 1) {
				throw new MyError(``);
			}
			let x_timelines = x_timelines_list[0];
			let x_DOMTimeline_list = XML.find_child_element(x_timelines, 'DOMTimeline');
			if (x_DOMTimeline_list.length !== 1) {
				throw new MyError(``);
			}
			let x_DOMTimeline = x_DOMTimeline_list[0];
			if (x_DOMTimeline.attribute.name !== 'animation') {
				throw new MyError(``);
			}
			let x_layers_list = XML.find_child_element(x_DOMTimeline, 'layers');
			if (x_layers_list.length !== 1) {
				throw new MyError(``);
			}
			let x_layers = x_layers_list[0];
			let x_DOMLayer_list = XML.find_child_element(x_layers, 'DOMLayer');
			if (x_DOMLayer_list.length !== 3) {
				throw new MyError(``);
			}
			{
				let x_DOMLayer_flow = x_DOMLayer_list[0];
				let x_frames_list = XML.find_child_element(x_DOMLayer_flow, 'frames');
				if (x_frames_list.length !== 1) {
					throw new MyError(``);
				}
				let x_frames = x_frames_list[0];
				let x_DOMFrame_list = XML.find_child_element(x_frames, 'DOMFrame');
				x_DOMFrame_list.forEach((x_DOMFrame) => {
					let frame_index = Number(x_DOMFrame.attribute.index);
					if (x_DOMFrame.attribute.name !== undefined) {
						if (x_DOMFrame.attribute.labelType !== 'name') {
							throw new MyError(``);
						}
						main_sprite_frame[frame_index].label = x_DOMFrame.attribute.name;
					}
					let x_Actionscript_list = XML.find_child_element(x_DOMFrame, 'Actionscript');
					if (x_Actionscript_list.length === 0) {
						return;
					}
					if (x_Actionscript_list.length !== 1) {
						throw new MyError(``);
					}
					let x_Actionscript = x_Actionscript_list[0];
					if (x_Actionscript.child.length !== 1) {
						throw new MyError(``);
					}
					let x_script_list = XML.find_child_element(x_Actionscript, 'script');
					if (x_script_list.length !== 1) {
						throw new MyError(``);
					}
					let x_script = x_script_list[0];
					if (x_script.child.length !== 1) {
						throw new MyError(``);
					}
					let x_script_text = x_script.child[0];
					if (x_script_text.type !== 'text') {
						throw new MyError(``);
					}
					if (x_script_text.value.value.trim() !== 'stop();') {
						throw new MyError(``);
					}
					main_sprite_frame[frame_index].stop = true;
				});
			}
			{
				let x_DOMLayer_command = x_DOMLayer_list[1];
				let x_frames_list = XML.find_child_element(x_DOMLayer_command, 'frames');
				if (x_frames_list.length !== 1) {
					throw new MyError(``);
				}
				let x_frames = x_frames_list[0];
				let x_DOMFrame_list = XML.find_child_element(x_frames, 'DOMFrame');
				x_DOMFrame_list.forEach((x_DOMFrame) => {
					let frame_index = Number(x_DOMFrame.attribute.index);
					let x_Actionscript_list = XML.find_child_element(x_DOMFrame, 'Actionscript');
					if (x_Actionscript_list.length === 0) {
						return;
					}
					if (x_Actionscript_list.length !== 1) {
						throw new MyError(``);
					}
					let x_Actionscript = x_Actionscript_list[0];
					if (x_Actionscript.child.length !== 1) {
						throw new MyError(``);
					}
					let x_script_list = XML.find_child_element(x_Actionscript, 'script');
					if (x_script_list.length !== 1) {
						throw new MyError(``);
					}
					let x_script = x_script_list[0];
					if (x_script.child.length !== 1) {
						throw new MyError(``);
					}
					let x_script_text = x_script.child[0];
					if (x_script_text.type !== 'text') {
						throw new MyError(``);
					}
					let command_string = x_script_text.value.value.trim().split('\n');
					for (let e of command_string) {
						let regex_result = /fscommand\("(.*)", "(.*)"\);/.exec(e.trim());
						if (regex_result === null) {
							throw new MyError('invalid command string');
						}
						main_sprite_frame[frame_index].command.push({
							command: regex_result[1],
							parameter: regex_result[2],
						});
					}
				});
			}
			{
				let x_DOMLayer_sprite = x_DOMLayer_list[2];
				// TODO : check
			}
		}
		let frame_rate = BigInt(x_DOMDocument.attribute.frameRate);
		let width = Number(x_DOMDocument.attribute.width);
		let height = Number(x_DOMDocument.attribute.height);
		return {
			version: flash.extra.version,
			frame_rate: frame_rate,
			position: flash.extra.position,
			size: [width, height],
			image: flash.extra.image.map((e, i) => ({ name: e.name, size: e.size, transform: parse_image_document(flash.library.image[i], i) })),
			sprite: flash.extra.sprite.map((e, i) => {
				let frame = parse_sprite_document(flash.library.sprite[i], i);
				return { name: e.name, frame_rate: Number(frame_rate), work_area: [0n, BigInt(frame.length)], frame: frame };
			}),
			main_sprite: { name: flash.extra.main_sprite.name, frame_rate: Number(frame_rate), work_area: [0n, BigInt(main_sprite_frame.length)], frame: main_sprite_frame },
		};
	}

	// ------------------------------------------------

	export function to_fs(
		raw_file: string,
		ripe_directory: string,
	): void {
		let ripe = load_flash_package(ripe_directory);
		let raw = to(ripe);
		CoreX.JSON.write_fs_js(raw_file, raw);
		return;
	}

	// ------------------------------------------------

}