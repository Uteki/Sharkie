# 🧪 Testing Instructions

## 📱 Always Reload When Changing Devices

When testing the site on different devices (especially in browser dev tools or emulators), **make sure to reload the page after switching to a new device or screen size.**

### Why?

Modern responsive designs and device detection (like mobile vs. desktop or portrait vs. landscape) often run **once on load**, so:

- Switching to a new device **without refreshing** may result in incorrect layout or behavior.
- Features like **fullscreen mode**, **touch detection**, or **orientation overlays** may not trigger properly unless the site is reloaded.

### ✅ Best Practice

1. Open dev tools or emulator.
2. Choose the desired device or resolution.
3. **Reload the site** (`Ctrl+R` / `Cmd+R`) to apply all device-specific behaviors.
