#[macro_use]
extern crate serde;

#[macro_use]
extern crate neon;

use neon::context::{Context, FunctionContext};
use neon::handle::Handle;
use neon::result::JsResult;
use neon::types::{JsBuffer, JsString};

use identicon_rs::{Identicon, ImageType};
use neon_serde;

#[derive(Debug, Serialize, Deserialize)]
struct Options {
  border: u32,
  size: u32,
  scale: u32,
  background: (u8, u8, u8),
  format: String,
}

fn generate(mut cx: FunctionContext) -> JsResult<JsBuffer> {
  let magic_word: Handle<JsString> = cx.argument(0)?;
  let raw_opt = cx.argument(1)?;
  let options: Options = neon_serde::from_value(&mut cx, raw_opt)?;

  let icon = Identicon::new(
    &magic_word.value(),
    options.border,
    options.size,
    options.scale,
    options.background,
  );

  let icon_buff = icon.export_file_data(match options.format.as_str() {
    "png" => ImageType::PNG,
    "jpeg" => ImageType::JPEG,
    _ => unreachable!(),
  });

  let mut buffer = JsBuffer::new(&mut cx, icon_buff.len() as u32)?;

  cx.borrow_mut(&mut buffer, |data| {
    data.as_mut_slice::<u8>().copy_from_slice(&icon_buff);
  });

  Ok(buffer)
}

register_module!(mut m, { m.export_function("generate", generate) });
