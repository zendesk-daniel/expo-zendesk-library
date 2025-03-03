# 🚀 Expo Zendesk Library

The `expo-zendesk-library` package integrates Zendesk functionality into your Expo app, enabling native Zendesk capabilities for both Android and iOS. Follow the steps below to install, configure, and contribute to the project.

## 📦 Installation

### Add the Package to Your Project

Install the `expo-zendesk-library` into your app’s dependencies:


```bash
 npm install expo-zendesk-library
```


Once installed, you need to build your Expo app for Android and iOS to generate the respective build folders.

For **Android**:

```
expo run:android
```

For **IOS**:

```
expo run:ios
```

## 🛠️ Configuration

### Android Configuration

1. Open the `android/build.gradle` file in the root of your project.
2. Add the following repository to the `allprojects` section:

```groovy
allprojects {
    repositories {
        ...
        maven { url "https://zendesk.jfrog.io/artifactory/repo" }
    }
}
```


### IOS Configuration

Run `npx pod-install` after installing the npm package.


---

## 🚀 Running the Project Locally

To set up and run the example project, follow these steps:

### 1. Install Dependencies

Run the following commands to install the required packages:

```bash
# At the root level
npm install

# Inside the example folder
cd example
npm install
```

### 2. Build the Library

Navigate back to the **root** directory and run:

```bash
npm run build
```

This compiles the library for use in the example project.

### 3. Run the Example App

Open a **new terminal window**, navigate to the **example** folder, and start the app:

For **Android**:

```bash
npm run android
```

For **iOS**:

```bash
npm run ios
```

> **Note:** Ensure you have the necessary development environment set up for React Native, including Android Studio (for Android) and Xcode (for iOS).
>
> 

# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide]( https://github.com/expo/expo#contributing).
