@echo off
setlocal enabledelayedexpansion

set src=C:\Users\TwinKleS\Documents\Code\TwinKleS\ToolKit\script
set dst=C:\Users\TwinKleS\Documents\Code\TwinKleS\ToolKit\script\.out

set list[1]=Language\Language.json
set list[2]=Entry\Entry.json
set list[3]=Entry\method\js.json
set list[4]=Entry\method\json.json
set list[5]=Entry\method\data.base64.json
set list[6]=Entry\method\data.xor.json
set list[7]=Entry\method\data.zlib.json
set list[8]=Entry\method\data.hash.json
set list[9]=Entry\method\package.popcap_pak.json
set list[10]=Entry\method\package.popcap_dz.json
set list[11]=Entry\method\package.popcap_rsgp.json
set list[12]=Entry\method\package.popcap_rsb.json
set list[13]=Entry\method\image.atlas.json
set list[14]=Entry\method\image.popcap_texture.json
set list[15]=Entry\method\animation.popcap_animation.json
set list[16]=Entry\method\audio.wwise_sound_bank.json
set list[17]=Entry\method\audio.wwise_encoded_media.json
set list[18]=Entry\method\other.popcap_rton.json
set list[19]=Entry\method\other.popcap_zlib.json
set list[20]=Entry\method\other.pvz2.lawn_string_text.json
set list[21]=Entry\method\expand.json

for /l %%i in (1, 1, 21) do (
    mklink %dst%\!list[%%i]! %src%\!list[%%i]!
)

pause