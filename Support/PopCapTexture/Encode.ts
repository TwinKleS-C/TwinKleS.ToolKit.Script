/** PTX编解码 */
namespace TwinKleS.Support.PopCapTexture.Encode {

	// ------------------------------------------------

	export const BaseFormatE = [
		'rgba_8888',
		'argb_8888',
		'rgba_4444',
		'rgb_565',
		'rgba_5551',
		'rgb_etc1_a_8',
		'rgba_pvrtc4',
		'rgb_pvrtc4_a_8',
	] as const;

	export const SpecialFormatE = [
		'rgba_4444_block',
		'rgb_565_block',
		'rgba_5551_block',
		'rgb_etc1_a_8_index',
	] as const;

	export const FormatE = [
		...BaseFormatE,
		...SpecialFormatE,
	] as const;

	export type BaseFormat = typeof BaseFormatE[number];

	export type SpecialFormat = typeof SpecialFormatE[number];

	export type Format = typeof FormatE[number];

	// ------------------------------------------------

	const k_base_format: Record<BaseFormat, Array<CoreX.Tool.Image.TextureFormat>> = {
		rgba_8888: [
			'rgba_8888',
		],
		argb_8888: [
			'argb_8888_l',
		],
		rgba_4444: [
			'rgba_4444_l',
		],
		rgb_565: [
			'rgb_565_l',
		],
		rgba_5551: [
			'rgba_5551_l',
		],
		rgb_etc1_a_8: [
			'rgb_etc1',
			'a_8',
		],
		rgba_pvrtc4: [
			'rgba_pvrtc4',
		],
		rgb_pvrtc4_a_8: [
			'rgb_pvrtc4',
			'a_8',
		],
	};

	// ------------------------------------------------

	type EncodeOption = {
		rgb_etc1_a_8_index: null | {
			index: Core.Tool.Other.PvZ2CHSRSBTextureAlphaIndex.JS_IndexList;
		};
	};

	// ------------------------------------------------

	export function compute_padded_image_size(
		origin_size: CoreX.Tool.Image.ImageSize,
		format: Format,
	): CoreX.Tool.Image.ImageSize {
		let compute = (t: bigint) => {
			let r = 0b1n << 1n;
			while (r < t) {
				r <<= 1n;
			}
			return r;
		};
		let padded_size: CoreX.Tool.Image.ImageSize;
		if (format.includes('etc1')) {
			padded_size = [compute(origin_size[0]), compute(origin_size[1])];
		} else if (format.includes('pvrtc')) {
			let padded_width = compute(origin_size[0]);
			let padded_height = compute(origin_size[1]);
			let max_size = padded_width > padded_height ? padded_width : padded_height;
			padded_size = [max_size, max_size];
		} else {
			padded_size = [origin_size[0], origin_size[1]];
		}
		return padded_size;
	}

	export function compute_data_size(
		size: CoreX.Tool.Image.ImageSize,
		format: Format,
		option: EncodeOption,
	): bigint {
		let data_size = 0n;
		if (BaseFormatE.includes(format as BaseFormat)) {
			data_size = CoreX.Tool.Image.compute_data_size_n(size, k_base_format[format as BaseFormat]);
		} else {
			switch (format) {
				case 'rgba_4444_block':
				case 'rgb_565_block':
				case 'rgba_5551_block': {
					data_size = CoreX.Tool.Image.compute_data_size_n(size, k_base_format[format.slice(0, -6) as BaseFormat]);
					break;
				}
				case 'rgb_etc1_a_8_index': {
					if (option.rgb_etc1_a_8_index === null) {
						throw new MyError(`option is null`);
					}
					data_size = CoreX.Tool.Image.compute_data_size(size, 'rgb_etc1') + CoreX.Tool.Other.PvZ2CHSRSBTextureAlphaIndex.compute_data_size_with_index_list(size, option.rgb_etc1_a_8_index.index.length);
					break;
				}
			}
		}
		return data_size;
	}

	export function encode(
		image: Core.Tool.Image.ConstantBitmapView,
		data: Core.OByteStreamView,
		format: Format,
		option: EncodeOption,
	): void {
		if (BaseFormatE.includes(format as BaseFormat)) {
			CoreX.Tool.Image.encode_n(image, data, k_base_format[format as BaseFormat]);
		} else {
			switch (format) {
				case 'rgba_4444_block':
				case 'rgb_565_block':
				case 'rgba_5551_block': {
					Core.Tool.Other.PvZ1RSBTexture20SeriesLayout.Encode.encode(image, data, Core.Tool.Image.TextureChannel.value(k_base_format[format.slice(0, -6) as BaseFormat][0] as Core.Tool.Image.JS_TextureChannel));
					break;
				}
				case 'rgb_etc1_a_8_index': {
					if (option.rgb_etc1_a_8_index === null) {
						throw new MyError(`option is null`);
					}
					CoreX.Tool.Image.encode(image, data, 'rgb_etc1');
					CoreX.Tool.Other.PvZ2CHSRSBTextureAlphaIndex.encode_with_map(image, data, option.rgb_etc1_a_8_index.index);
					break;
				}
			}
		}
		return;
	}

	export function decode(
		data: Core.IByteStreamView,
		image: Core.Tool.Image.BitmapView,
		format: Format,
	): void {
		if (BaseFormatE.includes(format as BaseFormat)) {
			CoreX.Tool.Image.decode_n(data, image, k_base_format[format as BaseFormat]);
		} else {
			switch (format) {
				case 'rgba_4444_block':
				case 'rgb_565_block':
				case 'rgba_5551_block': {
					Core.Tool.Other.PvZ1RSBTexture20SeriesLayout.Decode.decode(data, image, Core.Tool.Image.TextureChannel.value(k_base_format[format.slice(0, -6) as BaseFormat][0] as Core.Tool.Image.JS_TextureChannel));
					break;
				}
				case 'rgb_etc1_a_8_index': {
					CoreX.Tool.Image.decode(data, image, 'rgb_etc1');
					CoreX.Tool.Other.PvZ2CHSRSBTextureAlphaIndex.decode_with_map(data, image);
					break;
				}
			}
		}
		return;
	}

	// ------------------------------------------------

	export function encode_fs(
		image_file: string,
		data_file: string,
		format: Format,
	): void {
		let image_size = CoreX.Tool.Image.File.png_size_file(image_file);
		let padded_image_size = compute_padded_image_size(image_size, format);
		let image = Core.Tool.Image.Bitmap.alloc(Core.Tool.Image.ImageSize.value(padded_image_size));
		let image_view = image.view();
		CoreX.Tool.Image.File.png_read_file_to(image_file, image_view.sub_view(Core.Tool.Image.ImagePosition.value([0n, 0n]), Core.Tool.Image.ImageSize.value(image_size)));
		let option: EncodeOption = {
			rgb_etc1_a_8_index: null,
		};
		if (format === 'rgb_etc1_a_8_index') {
			option.rgb_etc1_a_8_index = {
				index: CoreX.Tool.Other.PvZ2CHSRSBTextureAlphaIndex.evaluate_index_list(image_view),
			};
		}
		let data_size = compute_data_size(padded_image_size, format, option);
		let data = Core.ByteArray.alloc(Core.Size.value(data_size));
		let data_stream = Core.ByteStreamView.look(data.view());
		encode(image_view, data_stream, format, option);
		CoreX.FileSystem.write_file(data_file, data_stream.stream_view());
		return;
	}

	export function decode_fs(
		data_file: string,
		image_file: string,
		image_size: CoreX.Tool.Image.ImageSize,
		format: Format,
	): void {
		let data = CoreX.FileSystem.read_file(data_file);
		let data_stream = Core.ByteStreamView.look(data.view());
		let padded_image_size = compute_padded_image_size(image_size, format);
		let image = Core.Tool.Image.Bitmap.alloc(Core.Tool.Image.ImageSize.value(padded_image_size));
		let image_view = image.view();
		decode(data_stream, image_view, format);
		CoreX.Tool.Image.File.png_write_file(image_file, image_view.sub_view(Core.Tool.Image.ImagePosition.value([0n, 0n]), Core.Tool.Image.ImageSize.value(image_size)));
		return;
	}

	// ------------------------------------------------

}