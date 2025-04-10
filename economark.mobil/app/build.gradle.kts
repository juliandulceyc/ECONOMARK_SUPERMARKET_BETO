plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
}

android {
    namespace = "economark.mobile"
    compileSdk = 35

    defaultConfig {
        applicationId = "economark.mobile"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }

    kotlinOptions {
        jvmTarget = "11"
    }

    // Opcional: habilitar View Binding si lo requieres en tu proyecto
    buildFeatures {
        viewBinding = true
    }
}

dependencies {
    // Dependencias básicas de AndroidX y Material Components
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.appcompat)
    implementation(libs.material) // Esto resuelve a com.google.android.material:material:<version>
    implementation(libs.androidx.activity)
    implementation(libs.androidx.constraintlayout)

    // Agrega CardView ya que en tu layout usas CardView
    implementation("androidx.cardview:cardview:1.0.0")

    // Dependencias para tests
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
}
