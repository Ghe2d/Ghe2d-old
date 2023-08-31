cmake_minimum_required(VERSION 3.13)

file(GLOB_RECURSE source "*.cpp")
set(Main_File main)
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_PREFIX_PATH "/home/hlever/Apps/vcpkg/installed/x64-linux/share")
set(VCPKG_INSTALLED_DIR "/home/hlever/Apps/vcpkg/installed")

set(VCPKG_TARGET_TRIPLET "x64-linux")


project(${Main_File} CXX)

set(APP_DIR "${CMAKE_CURRENT_LIST_DIR}"
    CACHE PATH "Application directory")

set(FRIBIDI_DIR "${APP_DIR}/../fribidi-cmake"
    CACHE PATH "Location of 'fribidi'")


# add_subdirectory(${ICE_DIR})

# add_subdirectory(${HAR_DIR})

# include_directories(${HAR_DIR})

add_library(${Main_File} SHARED ${source})
find_package(fmt CONFIG REQUIRED)
find_package(blend2d CONFIG REQUIRED)
# find_package(asmjit CONFIG REQUIRED)

# include_directories(${HARF_DIR})

# lib(${VCPKG_INSTALLED_DIR}/${VCPKG_TARGET_TRIPLET}/lib/libfribidi.a)
target_include_directories(${Main_File} PRIVATE ${FRIBIDI_DIR})

target_link_libraries(${Main_File} PRIVATE fmt::fmt blend2d::blend2d fribidi)
