const path = require("path");
const express = require("express");
const fetch = require("node-fetch"); // versi 2

const app = express();

// ===== Tambahkan ini =====
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
// =========================

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // penting

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "hehe.html"));
});

// Base URL untuk API
const BASE_URL = "https://e-absensi.pidiekab.go.id/api";

// Data user yang dipindah dari frontend
const users = {
  nabila: {
    id: "199709212021082001",
    password: "akunabila21",
    id_device: "%7B%22android_info%22%3A%7B%22id%22%3A%22TP1A.220624.014%22%2C%22version%22%3A%7B%22sdkInt%22%3A33%2C%22release%22%3A%2213%22%7D%2C%22brand%22%3A%22samsung%22%2C%22device%22%3A%22a54x%22%2C%22hardware%22%3A%22s5e8835%22%2C%22product%22%3A%22a54xnsxx%22%2C%22serial_Number%22%3A%22unknown%22%2C%22system_features%22%3A%5B%22android.hardware.sensor.proximity%22%2C%22com.samsung.android.sdk.camera.processor%22%2C%22com.samsung.feature.aodservice_v10%22%2C%22com.sec.feature.motionrecognition_service%22%2C%22com.sec.feature.cover.sview%22%2C%22android.hardware.telephony.ims.singlereg%22%2C%22android.hardware.sensor.accelerometer%22%2C%22android.software.controls%22%2C%22android.hardware.faketouch%22%2C%22android.software.telecom%22%2C%22com.samsung.feature.audio_listenback%22%2C%22android.hardware.telephony.subscription%22%2C%22android.hardware.usb.accessory%22%2C%22android.hardware.telephony.data%22%2C%22android.software.backup%22%2C%22android.hardware.touchscreen%22%2C%22android.hardware.touchscreen.multitouch%22%2C%22android.software.erofs%22%2C%22android.software.print%22%2C%22android.software.activities_on_secondary_displays%22%2C%22com.sec.feature.nfc_authentication_cover%22%2C%22com.samsung.feature.SAMSUNG_EXPERIENCE%22%2C%22com.google.android.feature.ACCESSIBILITY_PRELOAD%22%2C%22com.sec.feature.nfc_authentication%22%2C%22android.software.voice_recognizers%22%2C%22android.software.picture_in_picture%22%2C%22android.hardware.fingerprint%22%2C%22com.samsung.android.knox.knoxsdk%22%2C%22android.hardware.sensor.gyroscope%22%2C%22android.hardware.audio.low_latency%22%2C%22android.software.vulkan.deqp.level%22%2C%22android.software.cant_save_state%22%2C%22android.hardware.security.model.compatible%22%2C%22android.hardware.telephony.messaging%22%2C%22com.samsung.feature.device_category_phone%22%2C%22com.samsung.android.nfc.t4temul%22%2C%22android.hardware.telephony.calling%22%2C%22android.hardware.opengles.aep%22%2C%22com.sec.feature.sensorhub%22%2C%22android.hardware.bluetooth%22%2C%22android.software.window_magnification%22%2C%22android.hardware.telephony.radio.access%22%2C%22android.hardware.camera.autofocus%22%2C%22android.hardware.telephony.gsm%22%2C%22android.hardware.telephony.ims%22%2C%22com.sec.feature.cocktailpanel%22%2C%22android.software.incremental_delivery%22%2C%22android.software.sip.voip%22%2C%22android.software.opengles.deqp.level%22%2C%22com.sec.feature.saccessorymanager%22%2C%22com.samsung.feature.samsung_experience_mobile%22%2C%22android.hardware.usb.host%22%2C%22android.hardware.audio.output%22%2C%22android.software.verified_boot%22%2C%22android.hardware.camera.flash%22%2C%22android.hardware.camera.front%22%2C%22android.hardware.se.omapi.uicc%22%2C%22android.hardware.screen.portrait%22%2C%22com.google.android.feature.ASI%22%2C%22android.hardware.nfc%22%2C%22com.google.android.feature.TURBO_PRELOAD%22%2C%22com.samsung.feature.ipsgeofence%22%2C%22com.nxp.mifare%22%2C%22com.samsung.feature.SAMSUNG_EXPERIENCE_AM%22%2C%22android.hardware.sensor.stepdetector%22%2C%22android.software.home_screen%22%2C%22android.hardware.microphone%22%2C%22com.sec.feature.cover.clearcameraviewcover%22%2C%22com.samsung.feature.aremoji.v2%22%2C%22android.software.autofill%22%2C%22com.samsung.android.sdk.camera.processor.effect%22%2C%22android.software.securely_removes_users%22%2C%22android.hardware.bluetooth_le%22%2C%22android.hardware.sensor.compass%22%2C%22android.hardware.touchscreen.multitouch.jazzhand%22%2C%22android.software.app_widgets%22%2C%22android.software.input_methods%22%2C%22android.hardware.sensor.light%22%2C%22android.hardware.vulkan.version%22%2C%22android.software.companion_device_setup%22%2C%22com.google.android.feature.galaxyfinder_v7%22%2C%22android.software.device_admin%22%2C%22android.hardware.wifi.passpoint%22%2C%22android.hardware.camera%22%2C%22android.hardware.screen.landscape%22%2C%22android.software.device_id_attestation%22%2C%22com.google.android.feature.AER_OPTIMIZED%22%2C%22android.hardware.ram.normal%22%2C%22com.samsung.feature.samsungpositioning.snlp%22%2C%22com.samsung.android.authfw%22%2C%22com.samsung.android.api.version.2402%22%2C%22com.samsung.android.api.version.2403%22%2C%22com.samsung.android.api.version.2501%22%2C%22com.samsung.android.api.version.2502%22%2C%22com.samsung.android.api.version.2601%22%2C%22com.samsung.android.api.version.2701%22%2C%22com.samsung.android.api.version.2801%22%2C%22com.samsung.android.api.version.2802%22%2C%22com.samsung.android.api.version.2803%22%2C%22com.samsung.android.api.version.2901%22%2C%22com.samsung.android.api.version.2902%22%2C%22com.samsung.android.api.version.2903%22%2C%22com.samsung.android.api.version.3001%22%2C%22com.samsung.android.api.version.3002%22%2C%22com.samsung.android.api.version.3101%22%2C%22com.samsung.android.api.version.3201%22%2C%22com.samsung.android.api.version.3301%22%2C%22com.sec.feature.cover%22%2C%22android.software.managed_users%22%2C%22com.sec.feature.nsflp%22%2C%22android.software.webview%22%2C%22android.hardware.sensor.stepcounter%22%2C%22android.hardware.camera.any%22%2C%22android.hardware.vulkan.compute%22%2C%22android.hardware.touchscreen.multitouch.distinct%22%2C%22android.hardware.location.network%22%2C%22com.sec.android.secimaging%22%2C%22android.software.cts%22%2C%22android.software.sip%22%2C%22android.software.app_enumeration%22%2C%22com.sec.feature.usb_authentication%22%2C%22android.hardware.wifi.direct%22%2C%22android.software.live_wallpaper%22%2C%22android.software.ipsec_tunnels%22%2C%22android.hardware.audio.pro%22%2C%22android.hardware.nfc.hcef%22%2C%22android.hardware.nfc.uicc%22%2C%22com.samsung.feature.support_repair_mode%22%2C%22android.hardware.location.gps%22%2C%22com.samsung.android.camera.deviceinjector%22%2C%22android.software.midi%22%2C%22com.samsung.feature.samsungpositioning%22%2C%22android.hardware.nfc.any%22%2C%22android.hardware.nfc.hce%22%2C%22android.hardware.hardware_keystore%22%2C%22com.sec.feature.pocketsensitivitymode%22%2C%22android.hardware.wifi%22%2C%22android.hardware.location%22%2C%22android.hardware.vulkan.level%22%2C%22android.hardware.keystore.app_attest_key%22%2C%22com.samsung.android.cameraxservice%22%2C%22com.samsung.android.knox.knoxsdk.api.level.33%22%2C%22com.samsung.android.knox.knoxsdk.api.level.34%22%2C%22com.samsung.android.knox.knoxsdk.api.level.35%22%2C%22com.samsung.android.knox.knoxsdk.api.level.36%22%2C%22android.hardware.wifi.aware%22%2C%22android.software.secure_lock_screen%22%2C%22android.hardware.biometrics.face%22%2C%22android.hardware.telephony%22%2C%22com.sec.android.smartface.smart_stay%22%2C%22android.software.file_based_encryption%22%5D%7D%7D"
  },
  mukrim: {
    id: "199806122020121003",
    password: "123",
    id_device: "%7B%22android_info%22%3A%7B%22id%22%3A%22AP3A.240905.015.A2%22%2C%22version%22%3A%7B%22sdkInt%22%3A35%2C%22release%22%3A%2215%22%7D%2C%22brand%22%3A%22Xiaomi%22%2C%22device%22%3A%22degas%22%2C%22hardware%22%3A%22mt6897%22%2C%22product%22%3A%22degas_global%22%2C%22serial_Number%22%3A%22unknown%22%2C%22system_features%22%3A%5B%22android.hardware.sensor.proximity%22%2C%22com.google.android.feature.CONTEXTUAL_SEARCH%22%2C%22android.hardware.sensor.accelerometer%22%2C%22android.software.controls%22%2C%22android.hardware.faketouch%22%2C%22android.software.telecom%22%2C%22android.hardware.telephony.subscription%22%2C%22com.google.android.feature.D2D_CABLE_MIGRATION_FEATURE%22%2C%22android.hardware.telephony.euicc%22%2C%22android.hardware.usb.accessory%22%2C%22android.hardware.telephony.cdma%22%2C%22android.hardware.telephony.data%22%2C%22android.hardware.sensor.dynamic.head_tracker%22%2C%22android.software.backup%22%2C%22android.hardware.touchscreen%22%2C%22android.hardware.touchscreen.multitouch%22%2C%22android.software.erofs%22%2C%22android.software.print%22%2C%22android.hardware.consumerir%22%2C%22android.software.activities_on_secondary_displays%22%2C%22android.software.device_lock%22%2C%22android.software.voice_recognizers%22%2C%22com.google.lens.feature.CAMERA_INTEGRATION%22%2C%22android.software.picture_in_picture%22%2C%22android.hardware.fingerprint%22%2C%22android.hardware.sensor.gyroscope%22%2C%22android.hardware.audio.low_latency%22%2C%22com.google.android.feature.PERSONAL_SAFETY%22%2C%22android.software.vulkan.deqp.level%22%2C%22android.software.cant_save_state%22%2C%22android.hardware.security.model.compatible%22%2C%22android.hardware.telephony.messaging%22%2C%22android.hardware.telephony.calling%22%2C%22android.hardware.opengles.aep%22%2C%22android.hardware.bluetooth%22%2C%22android.software.window_magnification%22%2C%22android.hardware.telephony.radio.access%22%2C%22android.hardware.camera.autofocus%22%2C%22android.hardware.telephony.gsm%22%2C%22android.hardware.telephony.ims%22%2C%22android.software.incremental_delivery%22%2C%22android.hardware.se.omapi.ese%22%2C%22android.software.opengles.deqp.level%22%2C%22android.hardware.camera.concurrent%22%2C%22android.hardware.usb.host%22%2C%22android.hardware.audio.output%22%2C%22android.software.ipsec_tunnel_migration%22%2C%22android.software.verified_boot%22%2C%22android.hardware.camera.flash%22%2C%22android.hardware.camera.front%22%2C%22android.hardware.se.omapi.uicc%22%2C%22android.hardware.strongbox_keystore%22%2C%22android.hardware.screen.portrait%22%2C%22com.google.android.feature.ASI%22%2C%22android.hardware.nfc%22%2C%22com.android.se%22%2C%22com.nxp.mifare%22%2C%22android.hardware.sensor.stepdetector%22%2C%22android.software.home_screen%22%2C%22android.hardware.context_hub%22%2C%22android.hardware.microphone%22%2C%22com.google.ambient.streaming%22%2C%22android.software.autofill%22%2C%22android.software.securely_removes_users%22%2C%22android.hardware.bluetooth_le%22%2C%22android.hardware.sensor.compass%22%2C%22android.hardware.touchscreen.multitouch.jazzhand%22%2C%22android.software.app_widgets%22%2C%22android.software.input_methods%22%2C%22android.hardware.sensor.light%22%2C%22android.hardware.vulkan.version%22%2C%22android.software.companion_device_setup%22%2C%22com.google.android.feature.AICORE_MT_MT6897%22%2C%22android.software.device_admin%22%2C%22com.google.android.feature.WELLBEING%22%2C%22android.hardware.wifi.passpoint%22%2C%22android.hardware.camera%22%2C%22android.software.credentials%22%2C%22android.hardware.screen.landscape%22%2C%22android.software.device_id_attestation%22%2C%22com.google.android.feature.AER_OPTIMIZED%22%2C%22android.hardware.ram.normal%22%2C%22com.google.android.feature.AICORE_MT%22%2C%22android.software.managed_users%22%2C%22android.software.webview%22%2C%22android.hardware.sensor.stepcounter%22%2C%22android.hardware.camera.capability.manual_post_processing%22%2C%22com.google.lens.feature.IMAGE_INTEGRATION%22%2C%22android.hardware.camera.any%22%2C%22android.hardware.camera.capability.raw%22%2C%22android.hardware.vulkan.compute%22%2C%22com.google.android.apps.dialer.call_recording_audio%22%2C%22android.hardware.touchscreen.multitouch.distinct%22%2C%22android.hardware.location.network%22%2C%22android.software.cts%22%2C%22android.hardware.camera.capability.manual_sensor%22%2C%22android.software.app_enumeration%22%2C%22com.google.android.apps.dialer.SUPPORTED%22%2C%22android.hardware.camera.level.full%22%2C%22android.hardware.identity_credential%22%2C%22android.hardware.wifi.direct%22%2C%22android.software.live_wallpaper%22%2C%22com.mediatek.hardware.vow_dsp.riscv%22%2C%22android.software.ipsec_tunnels%22%2C%22android.hardware.nfc.hcef%22%2C%22android.hardware.nfc.uicc%22%2C%22android.hardware.location.gps%22%2C%22android.software.midi%22%2C%22com.mediatek.hardware.vow.2e2k%22%2C%22android.hardware.nfc.any%22%2C%22android.hardware.nfc.ese%22%2C%22android.hardware.nfc.hce%22%2C%22android.hardware.hardware_keystore%22%2C%22android.hardware.telephony.euicc.mep%22%2C%22android.hardware.wifi%22%2C%22android.hardware.location%22%2C%22android.hardware.vulkan.level%22%2C%22android.hardware.keystore.app_attest_key%22%2C%22android.software.secure_lock_screen%22%2C%22android.hardware.biometrics.face%22%2C%22android.hardware.telephony%22%2C%22android.software.file_based_encryption%22%5D%7D%7D"
  },
  mukhlis: {
		id: "196812311992101001",
		password: "427668",
		id_device: "%7B%22android_info%22%3A%7B%22id%22%3A%22SP1A.210812.016%22%2C%22version%22%3A%7B%22sdkInt%22%3A31%2C%22release%22%3A%2212%22%7D%2C%22brand%22%3A%22samsung%22%2C%22device%22%3A%22a21s%22%2C%22hardware%22%3A%22exynos850%22%2C%22product%22%3A%22a21snnxx%22%2C%22serial_Number%22%3A%22unknown%22%2C%22system_features%22%3A%5B%22android.hardware.sensor.proximity%22%2C%22com.samsung.android.sdk.camera.processor%22%2C%22com.sec.feature.motionrecognition_service%22%2C%22android.hardware.telephony.ims.singlereg%22%2C%22android.hardware.sensor.accelerometer%22%2C%22android.software.controls%22%2C%22android.hardware.faketouch%22%2C%22com.samsung.feature.audio_listenback%22%2C%22android.hardware.usb.accessory%22%2C%22android.software.backup%22%2C%22android.hardware.touchscreen%22%2C%22android.hardware.touchscreen.multitouch%22%2C%22android.software.print%22%2C%22android.software.activities_on_secondary_displays%22%2C%22com.samsung.feature.SAMSUNG_EXPERIENCE%22%2C%22com.google.android.feature.ACCESSIBILITY_PRELOAD%22%2C%22android.software.voice_recognizers%22%2C%22android.software.picture_in_picture%22%2C%22android.hardware.fingerprint%22%2C%22com.samsung.android.knox.knoxsdk%22%2C%22android.hardware.sensor.gyroscope%22%2C%22android.hardware.audio.low_latency%22%2C%22android.software.vulkan.deqp.level%22%2C%22android.software.cant_save_state%22%2C%22android.hardware.security.model.compatible%22%2C%22com.samsung.feature.device_category_phone%22%2C%22com.samsung.android.nfc.t4temul%22%2C%22android.hardware.opengles.aep%22%2C%22com.sec.feature.sensorhub%22%2C%22android.hardware.bluetooth%22%2C%22android.hardware.camera.autofocus%22%2C%22android.hardware.telephony.gsm%22%2C%22android.hardware.telephony.ims%22%2C%22com.sec.feature.cocktailpanel%22%2C%22android.software.sip.voip%22%2C%22android.software.opengles.deqp.level%22%2C%22com.sec.feature.saccessorymanager%22%2C%22android.hardware.usb.host%22%2C%22android.hardware.audio.output%22%2C%22android.software.verified_boot%22%2C%22android.hardware.camera.flash%22%2C%22android.hardware.camera.front%22%2C%22com.samsung.feature.clockpack_v09%22%2C%22android.hardware.se.omapi.uicc%22%2C%22android.hardware.screen.portrait%22%2C%22com.google.android.feature.TURBO_PRELOAD%22%2C%22com.samsung.feature.samsung_experience_mobile_lite%22%2C%22android.hardware.sensor.stepdetector%22%2C%22android.software.home_screen%22%2C%22android.hardware.microphone%22%2C%22android.software.autofill%22%2C%22com.samsung.android.sdk.camera.processor.effect%22%2C%22android.software.securely_removes_users%22%2C%22android.hardware.bluetooth_le%22%2C%22android.hardware.sensor.compass%22%2C%22android.hardware.touchscreen.multitouch.jazzhand%22%2C%22android.software.app_widgets%22%2C%22android.software.input_methods%22%2C%22android.hardware.vulkan.version%22%2C%22android.software.companion_device_setup%22%2C%22com.samsung.feature.galaxyfinder_v7%22%2C%22android.software.device_admin%22%2C%22android.hardware.keystore.limited_use_key%22%2C%22android.hardware.wifi.passpoint%22%2C%22android.hardware.camera%22%2C%22android.hardware.screen.landscape%22%2C%22android.hardware.ram.normal%22%2C%22com.samsung.android.api.version.2402%22%2C%22com.samsung.android.api.version.2403%22%2C%22com.samsung.android.api.version.2501%22%2C%22com.samsung.android.api.version.2502%22%2C%22com.samsung.android.api.version.2601%22%2C%22com.samsung.android.api.version.2701%22%2C%22com.samsung.android.api.version.2801%22%2C%22com.samsung.android.api.version.2802%22%2C%22com.samsung.android.api.version.2803%22%2C%22com.samsung.android.api.version.2901%22%2C%22com.samsung.android.api.version.2902%22%2C%22com.samsung.android.api.version.2903%22%2C%22com.samsung.android.api.version.3001%22%2C%22com.samsung.android.api.version.3002%22%2C%22com.samsung.android.api.version.3101%22%2C%22android.software.managed_users%22%2C%22com.sec.feature.nsflp%22%2C%22android.software.webview%22%2C%22android.hardware.sensor.stepcounter%22%2C%22android.hardware.camera.any%22%2C%22android.hardware.vulkan.compute%22%2C%22android.software.connectionservice%22%2C%22android.hardware.touchscreen.multitouch.distinct%22%2C%22android.hardware.location.network%22%2C%22com.sec.android.secimaging%22%2C%22android.software.cts%22%2C%22android.software.sip%22%2C%22android.software.app_enumeration%22%2C%22com.sec.feature.usb_authentication%22%2C%22android.hardware.wifi.direct%22%2C%22android.software.live_wallpaper%22%2C%22android.software.ipsec_tunnels%22%2C%22android.software.freeform_window_management%22%2C%22android.hardware.location.gps%22%2C%22android.software.midi%22%2C%22android.hardware.wifi%22%2C%22android.hardware.location%22%2C%22android.hardware.vulkan.level%22%2C%22com.samsung.android.knox.knoxsdk.api.level.33%22%2C%22com.samsung.android.knox.knoxsdk.api.level.34%22%2C%22com.samsung.android.knox.knoxsdk.api.level.35%22%2C%22android.software.secure_lock_screen%22%2C%22android.hardware.biometrics.face%22%2C%22android.hardware.telephony%22%2C%22com.sec.android.smartface.smart_stay%22%2C%22android.software.file_based_encryption%22%5D%7D%7D"
	},
	cut_novi: {
		id: "199212222024212017",
		password: "aleaathar",
		id_device: "%7B%22android_info%22%3A%7B%22id%22%3A%22TP1A.220905.001%22%2C%22version%22%3A%7B%22sdkInt%22%3A33%2C%22release%22%3A%2213%22%7D%2C%22brand%22%3A%22OPPO%22%2C%22device%22%3A%22OP533FL1%22%2C%22hardware%22%3A%22qcom%22%2C%22product%22%3A%22CPH2461T2%22%2C%22serial_Number%22%3A%22unknown%22%2C%22system_features%22%3A%5B%22oppo.runtime.permission.alert.support%22%2C%22com.oplus.software.children_space_google_play_exp%22%2C%22android.hardware.sensor.proximity%22%2C%22com.oplus.software.viewtalk_google_play%22%2C%22com.google.android.feature.ASI_MINIMAL%22%2C%22android.hardware.sensor.accelerometer%22%2C%22android.software.controls%22%2C%22android.hardware.faketouch%22%2C%22com.google.android.feature.D2D_CABLE_MIGRATION_FEATURE%22%2C%22android.hardware.usb.accessory%22%2C%22oppo.back.touch.fingerprint.sensor%22%2C%22android.hardware.telephony.cdma%22%2C%22android.software.backup%22%2C%22android.hardware.touchscreen%22%2C%22android.hardware.touchscreen.multitouch%22%2C%22oppo.common.support.curved.display%22%2C%22android.software.print%22%2C%22com.oplus.assistantscreen.google_play_exp%22%2C%22android.software.activities_on_secondary_displays%22%2C%22oplus.misc.lights.support%22%2C%22oplus.software.support_gp.type_phone%22%2C%22android.software.voice_recognizers%22%2C%22com.google.lens.feature.CAMERA_INTEGRATION%22%2C%22android.software.picture_in_picture%22%2C%22oplus.deviceowner.support%22%2C%22android.hardware.fingerprint%22%2C%22android.hardware.sensor.gyroscope%22%2C%22android.hardware.audio.low_latency%22%2C%22android.software.vulkan.deqp.level%22%2C%22android.software.cant_save_state%22%2C%22android.hardware.security.model.compatible%22%2C%22android.hardware.opengles.aep%22%2C%22oplus.software.support_gp.product_full%22%2C%22android.hardware.bluetooth%22%2C%22oplus.software.support_gp.region_export%22%2C%22android.software.window_magnification%22%2C%22android.hardware.camera.autofocus%22%2C%22android.hardware.telephony.gsm%22%2C%22android.hardware.telephony.ims%22%2C%22android.software.incremental_delivery%22%2C%22android.software.sip.voip%22%2C%22oplus.secrecy.support%22%2C%22android.hardware.usb.host%22%2C%22oppo.hardware.fingerprint.optical.support%22%2C%22android.hardware.audio.output%22%2C%22oppo.version.exp%22%2C%22android.software.verified_boot%22%2C%22android.hardware.camera.flash%22%2C%22android.hardware.camera.front%22%2C%22oppo.exp.default.browser%22%2C%22android.hardware.se.omapi.uicc%22%2C%22android.hardware.screen.portrait%22%2C%22android.hardware.nfc%22%2C%22com.nxp.mifare%22%2C%22android.hardware.sensor.stepdetector%22%2C%22android.software.home_screen%22%2C%22oppo.common_center.wlan.assistant%22%2C%22android.hardware.microphone%22%2C%22android.software.autofill%22%2C%22android.software.securely_removes_users%22%2C%22android.hardware.bluetooth_le%22%2C%22android.hardware.sensor.compass%22%2C%22android.hardware.touchscreen.multitouch.jazzhand%22%2C%22android.software.app_widgets%22%2C%22android.software.input_methods%22%2C%22android.hardware.sensor.light%22%2C%22android.hardware.vulkan.version%22%2C%22android.software.companion_device_setup%22%2C%22android.software.device_admin%22%2C%22com.google.android.feature.WELLBEING%22%2C%22android.hardware.wifi.passpoint%22%2C%22android.hardware.camera%22%2C%22com.games.exp%22%2C%22android.hardware.screen.landscape%22%2C%22android.hardware.ram.normal%22%2C%22com.games.oppo%22%2C%22android.software.managed_users%22%2C%22com.oplus.android.feature.PAI%22%2C%22android.software.webview%22%2C%22android.hardware.sensor.stepcounter%22%2C%22android.hardware.camera.capability.manual_post_processing%22%2C%22com.google.lens.feature.IMAGE_INTEGRATION%22%2C%22android.hardware.camera.any%22%2C%22android.hardware.camera.capability.raw%22%2C%22android.hardware.vulkan.compute%22%2C%22android.software.connectionservice%22%2C%22android.hardware.touchscreen.multitouch.distinct%22%2C%22android.hardware.location.network%22%2C%22android.software.cts%22%2C%22android.software.sip%22%2C%22android.hardware.camera.capability.manual_sensor%22%2C%22android.software.app_enumeration%22%2C%22oplus.software.support_gp.brand_oppo%22%2C%22oppo.qualcomm.gemini.support%22%2C%22android.hardware.camera.level.full%22%2C%22oppo.hw.manufacturer.qualcomm%22%2C%22android.hardware.wifi.direct%22%2C%22android.software.live_wallpaper%22%2C%22oppo.docvault.support%22%2C%22android.software.ipsec_tunnels%22%2C%22android.hardware.nfc.hcef%22%2C%22android.hardware.nfc.uicc%22%2C%22android.hardware.location.gps%22%2C%22android.software.midi%22%2C%22android.hardware.nfc.any%22%2C%22android.hardware.nfc.hce%22%2C%22android.hardware.hardware_keystore%22%2C%22android.hardware.wifi%22%2C%22android.hardware.location%22%2C%22android.hardware.vulkan.level%22%2C%22com.oplus.software.screenrecorder_google_play%22%2C%22android.software.secure_lock_screen%22%2C%22android.hardware.biometrics.face%22%2C%22android.hardware.telephony%22%2C%22android.software.file_based_encryption%22%5D%7D%7D"
	},
	ilham: {
		id: "198707072024211003",
		password: "7un",
		id_device: "%7B%22android_info%22%3A%7B%22id%22%3A%22UP1A.231005.007%22%2C%22version%22%3A%7B%22sdkInt%22%3A34%2C%22release%22%3A%2214%22%7D%2C%22brand%22%3A%22Redmi%22%2C%22device%22%3A%22ruby%22%2C%22hardware%22%3A%22mt6877%22%2C%22product%22%3A%22ruby_id%22%2C%22serial_Number%22%3A%22unknown%22%2C%22system_features%22%3A%5B%22android.hardware.sensor.proximity%22%2C%22com.google.android.feature.ASI_MINIMAL%22%2C%22android.software.adoptable_storage%22%2C%22android.hardware.sensor.accelerometer%22%2C%22android.software.controls%22%2C%22android.hardware.faketouch%22%2C%22com.google.android.feature.D2D_CABLE_MIGRATION_FEATURE%22%2C%22android.hardware.usb.accessory%22%2C%22android.hardware.telephony.cdma%22%2C%22android.software.backup%22%2C%22android.hardware.touchscreen%22%2C%22android.hardware.touchscreen.multitouch%22%2C%22android.software.print%22%2C%22android.hardware.consumerir%22%2C%22android.software.activities_on_secondary_displays%22%2C%22android.software.device_lock%22%2C%22android.software.voice_recognizers%22%2C%22com.google.lens.feature.CAMERA_INTEGRATION%22%2C%22android.software.picture_in_picture%22%2C%22android.hardware.fingerprint%22%2C%22android.hardware.sensor.gyroscope%22%2C%22android.hardware.audio.low_latency%22%2C%22com.google.android.feature.PERSONAL_SAFETY%22%2C%22android.software.vulkan.deqp.level%22%2C%22android.software.cant_save_state%22%2C%22android.hardware.security.model.compatible%22%2C%22android.hardware.opengles.aep%22%2C%22android.hardware.bluetooth%22%2C%22android.software.window_magnification%22%2C%22android.hardware.camera.autofocus%22%2C%22android.hardware.telephony.gsm%22%2C%22android.hardware.telephony.ims%22%2C%22android.software.incremental_delivery%22%2C%22android.software.opengles.deqp.level%22%2C%22android.hardware.usb.host%22%2C%22android.hardware.audio.output%22%2C%22android.software.verified_boot%22%2C%22android.hardware.camera.flash%22%2C%22android.hardware.camera.front%22%2C%22android.hardware.se.omapi.uicc%22%2C%22android.hardware.screen.portrait%22%2C%22android.hardware.nfc%22%2C%22com.google.android.feature.TURBO_PRELOAD%22%2C%22android.hardware.sensor.stepdetector%22%2C%22android.software.home_screen%22%2C%22android.hardware.microphone%22%2C%22com.google.ambient.streaming%22%2C%22android.software.autofill%22%2C%22android.software.securely_removes_users%22%2C%22android.hardware.bluetooth_le%22%2C%22android.hardware.sensor.compass%22%2C%22android.hardware.touchscreen.multitouch.jazzhand%22%2C%22android.software.app_widgets%22%2C%22android.software.input_methods%22%2C%22android.hardware.sensor.light%22%2C%22android.hardware.vulkan.version%22%2C%22android.software.companion_device_setup%22%2C%22android.software.device_admin%22%2C%22com.google.android.feature.WELLBEING%22%2C%22android.hardware.wifi.passpoint%22%2C%22android.hardware.camera%22%2C%22android.software.credentials%22%2C%22android.hardware.screen.landscape%22%2C%22com.google.android.feature.AER_OPTIMIZED%22%2C%22android.hardware.ram.normal%22%2C%22android.software.managed_users%22%2C%22android.software.webview%22%2C%22android.hardware.sensor.stepcounter%22%2C%22android.hardware.camera.capability.manual_post_processing%22%2C%22com.google.lens.feature.IMAGE_INTEGRATION%22%2C%22android.hardware.camera.any%22%2C%22android.hardware.camera.capability.raw%22%2C%22android.hardware.vulkan.compute%22%2C%22com.google.android.apps.dialer.call_recording_audio%22%2C%22android.software.connectionservice%22%2C%22android.hardware.touchscreen.multitouch.distinct%22%2C%22android.hardware.location.network%22%2C%22android.software.cts%22%2C%22android.hardware.camera.capability.manual_sensor%22%2C%22android.software.app_enumeration%22%2C%22android.hardware.camera.level.full%22%2C%22android.hardware.wifi.direct%22%2C%22android.software.live_wallpaper%22%2C%22com.mediatek.hardware.vow_dsp.riscv%22%2C%22android.software.ipsec_tunnels%22%2C%22android.hardware.nfc.hcef%22%2C%22android.hardware.nfc.uicc%22%2C%22android.hardware.location.gps%22%2C%22android.software.midi%22%2C%22com.mediatek.hardware.vow.2e2k%22%2C%22android.hardware.nfc.any%22%2C%22android.hardware.nfc.hce%22%2C%22android.hardware.hardware_keystore%22%2C%22android.hardware.wifi%22%2C%22android.hardware.location%22%2C%22android.hardware.vulkan.level%22%2C%22android.software.virtualization_framework%22%2C%22android.software.secure_lock_screen%22%2C%22android.hardware.telephony%22%2C%22android.software.file_based_encryption%22%5D%7D%7D"
	},
	amshar: {
		id: "1107132408880001",
		password: "Asdf1234",
		id_device: "%7B%22android_info%22%3A%7B%22id%22%3A%22UP1A.230905.011%22%2C%22version%22%3A%7B%22sdkInt%22%3A34%2C%22release%22%3A%2214%22%7D%2C%22brand%22%3A%22Xiaomi%22%2C%22device%22%3A%22aristotle%22%2C%22hardware%22%3A%22mt6895%22%2C%22product%22%3A%22aristotle_id%22%2C%22serial_Number%22%3A%22unknown%22%2C%22system_features%22%3A%5B%22android.hardware.sensor.proximity%22%2C%22android.software.adoptable_storage%22%2C%22android.hardware.sensor.accelerometer%22%2C%22android.software.controls%22%2C%22android.hardware.faketouch%22%2C%22com.google.android.feature.D2D_CABLE_MIGRATION_FEATURE%22%2C%22android.hardware.telephony.euicc%22%2C%22android.hardware.usb.accessory%22%2C%22android.hardware.telephony.cdma%22%2C%22android.software.backup%22%2C%22android.hardware.touchscreen%22%2C%22android.hardware.touchscreen.multitouch%22%2C%22android.software.print%22%2C%22android.hardware.consumerir%22%2C%22android.software.activities_on_secondary_displays%22%2C%22android.software.device_lock%22%2C%22android.software.voice_recognizers%22%2C%22com.google.lens.feature.CAMERA_INTEGRATION%22%2C%22android.software.picture_in_picture%22%2C%22android.hardware.fingerprint%22%2C%22android.hardware.sensor.gyroscope%22%2C%22android.hardware.audio.low_latency%22%2C%22com.google.android.feature.PERSONAL_SAFETY%22%2C%22android.software.vulkan.deqp.level%22%2C%22android.software.cant_save_state%22%2C%22android.hardware.security.model.compatible%22%2C%22android.hardware.opengles.aep%22%2C%22android.hardware.bluetooth%22%2C%22android.software.window_magnification%22%2C%22android.hardware.camera.autofocus%22%2C%22android.hardware.telephony.gsm%22%2C%22android.hardware.telephony.ims%22%2C%22android.software.incremental_delivery%22%2C%22android.hardware.se.omapi.ese%22%2C%22android.software.opengles.deqp.level%22%2C%22android.hardware.camera.concurrent%22%2C%22android.hardware.usb.host%22%2C%22android.hardware.audio.output%22%2C%22android.software.verified_boot%22%2C%22android.hardware.camera.flash%22%2C%22android.hardware.camera.front%22%2C%22android.hardware.se.omapi.uicc%22%2C%22android.hardware.screen.portrait%22%2C%22com.google.android.feature.ASI%22%2C%22android.hardware.nfc%22%2C%22com.google.android.feature.TURBO_PRELOAD%22%2C%22com.nxp.mifare%22%2C%22android.hardware.sensor.stepdetector%22%2C%22android.software.home_screen%22%2C%22android.hardware.microphone%22%2C%22com.google.ambient.streaming%22%2C%22android.software.autofill%22%2C%22android.software.securely_removes_users%22%2C%22android.hardware.bluetooth_le%22%2C%22android.hardware.sensor.compass%22%2C%22android.hardware.touchscreen.multitouch.jazzhand%22%2C%22android.software.app_widgets%22%2C%22android.software.input_methods%22%2C%22android.hardware.sensor.light%22%2C%22android.hardware.vulkan.version%22%2C%22android.software.companion_device_setup%22%2C%22android.software.device_admin%22%2C%22com.google.android.feature.WELLBEING%22%2C%22android.hardware.wifi.passpoint%22%2C%22android.hardware.camera%22%2C%22android.software.credentials%22%2C%22android.hardware.screen.landscape%22%2C%22com.google.android.feature.AER_OPTIMIZED%22%2C%22android.hardware.ram.normal%22%2C%22android.software.managed_users%22%2C%22android.software.webview%22%2C%22android.hardware.sensor.stepcounter%22%2C%22android.hardware.camera.capability.manual_post_processing%22%2C%22com.google.lens.feature.IMAGE_INTEGRATION%22%2C%22android.hardware.camera.any%22%2C%22android.hardware.camera.capability.raw%22%2C%22android.hardware.vulkan.compute%22%2C%22com.google.android.apps.dialer.call_recording_audio%22%2C%22android.software.connectionservice%22%2C%22android.hardware.touchscreen.multitouch.distinct%22%2C%22android.hardware.location.network%22%2C%22android.software.cts%22%2C%22android.hardware.camera.capability.manual_sensor%22%2C%22android.software.app_enumeration%22%2C%22com.google.android.apps.dialer.SUPPORTED%22%2C%22android.hardware.camera.level.full%22%2C%22android.hardware.wifi.direct%22%2C%22android.software.live_wallpaper%22%2C%22com.mediatek.hardware.vow_dsp.riscv%22%2C%22android.software.ipsec_tunnels%22%2C%22android.hardware.nfc.hcef%22%2C%22android.hardware.nfc.uicc%22%2C%22android.hardware.location.gps%22%2C%22android.software.midi%22%2C%22com.mediatek.hardware.vow.2e2k%22%2C%22android.hardware.nfc.any%22%2C%22android.hardware.nfc.ese%22%2C%22android.hardware.nfc.hce%22%2C%22android.hardware.hardware_keystore%22%2C%22android.hardware.wifi%22%2C%22android.hardware.location%22%2C%22android.hardware.vulkan.level%22%2C%22android.hardware.keystore.app_attest_key%22%2C%22android.software.secure_lock_screen%22%2C%22android.hardware.telephony%22%2C%22android.software.file_based_encryption%22%5D%7D%7D"
	}
};

// Endpoint untuk login

app.post("/proxy/login", async (req, res) => {
  try {
    const alias = (req.body && (req.body.users || req.body.alias)) || (req.query && (req.query.users || req.query.alias));
    if (!alias || !users[alias]) return res.status(400).json({ error: "User alias tidak ditemukan" });

    const u = users[alias];
    const form = new URLSearchParams({ id: u.id, password: u.password, id_device: u.id_device }).toString();
    const r = await fetch(`${BASE_URL}/in_login_password`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded; charset=utf-8", "User-Agent": "Dart/3.3 (dart:io)", "Accept-Encoding": "gzip" }, body: form });
    const text = await r.text();
    res.type("text/plain").send(text);
  } catch (e) {
    res.status(500).json({ error: "Login proxy failed", detail: e.message });
  }
});


// Endpoint untuk riwayat
app.post("/proxy/riwayat", async (req, res) => {
  const targetUrl = `${BASE_URL}/in_riwayat`;
  const form = new URLSearchParams(req.body).toString();
  
  console.log("⏩ Sending riwayat to:", targetUrl);
  // // console.log("📦 Data hidden"); // Hidden for security

  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        "User-Agent": "Dart/3.3 (dart:io)",
        "Accept-Encoding": "gzip"
      },
      body: form
    });

    const text = await response.text();
    res.set("Content-Type", "text/plain");
    res.send(text);
  } catch (err) {
    res.status(500).json({ error: "Riwayat proxy failed", detail: err.message });
  }
});

// Endpoint untuk absen
app.post("/proxy/absen", async (req, res) => {
  const targetUrl = `${BASE_URL}/in_absen_pegawai`;

  // Ambil data dari body
  const alias = req.body.alias;
  const token = req.body.token;
  const koordinat = req.body.koordinat;

  // Prioritas: pakai id_device dari body jika ada, kalau tidak pakai dari mapping users[alias]
  const iddev = req.body.id_device || (alias && users[alias]?.id_device);
  if (!token || !koordinat || !iddev) {
    return res.status(400).json({ error: "token/koordinat/id_device tidak lengkap" });
  }

  const form = new URLSearchParams({ token, koordinat, id_device: iddev }).toString();

  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        "User-Agent": "Dart/3.3 (dart:io)",
        "Accept-Encoding": "gzip"
      },
      body: form
    });
    const text = await response.text();
    res.type("text/plain").send(text);
  } catch (err) {
    res.status(500).json({ error: "Absen proxy failed", detail: err.message });
  }
});


// Endpoint untuk info
app.post("/proxy/info", async (req, res) => {
  const targetUrl = `${BASE_URL}/in_page_absensi`;
  const form = new URLSearchParams(req.body).toString();
  
  console.log("⏩ Sending info to:", targetUrl);
  // // console.log("📦 Data hidden"); // Hidden for security

  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        "User-Agent": "Dart/3.3 (dart:io)",
        "Accept-Encoding": "gzip"
      },
      body: form
    });

    const text = await response.text();
    res.set("Content-Type", "text/plain");
    res.send(text);
  } catch (err) {
    res.status(500).json({ error: "Info proxy failed", detail: err.message });
  }
});

// Endpoint untuk add user (id_device)
// Endpoint untuk add user (id_device) — return minimal
app.post("/proxy/add-user", async (req, res) => {
  const targetUrl = `${BASE_URL}/in_login_password`;
  const form = new URLSearchParams(req.body).toString();

  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        "User-Agent": "Dart/3.3 (dart:io)",
        "Accept-Encoding": "gzip"
      },
      body: form
    });

    const text = await response.text();

    // Coba parse JSON dari upstream
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      // Upstream balas non-JSON → jangan bocorkan isi mentah
      return res.status(502).json({ status: 0, error: "Upstream non-JSON" });
    }

    // Ambil id_device dari jalur yang biasa dipakai
    const iddev =
      data?.return?.id_device ||
      data?.id_device ||
      null;

    if (!iddev) {
      // Jika tidak ada, kirim error minimal (tanpa raw dump)
      return res.status(502).json({ status: 0, error: "id_device tidak ditemukan" });
    }

    // Kembalikan hanya yang dibutuhkan frontend
    return res.json({ status: 1, return: { id_device: iddev } });
  } catch (err) {
    return res.status(500).json({ status: 0, error: "Add user proxy failed", detail: err.message });
  }
});

// Endpoint untuk mendapatkan data user
app.get("/proxy/users", (req, res) => {
  res.json(Object.keys(users));  // hanya alias
});

// Endpoint untuk mendapatkan data user berdasarkan nama
app.get("/proxy/users/:name", (req, res) => {
  const userName = req.params.name;
  if (users[userName]) {
    res.json(users[userName]);
  } else {
    res.status(404).json({ error: "User tidak ditemukan" });
  }
});

// Legacy endpoint untuk backward compatibility (akan dihapus nanti)
app.post("/proxy", async (req, res) => {
  res.status(400).json({ 
    error: "Legacy endpoint deprecated", 
    message: "Please use specific endpoints like /proxy/login, /proxy/riwayat, etc." 
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Proxy running on port ${PORT}`));
