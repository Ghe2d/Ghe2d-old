cmake_minimum_required(VERSION 3.13)

file(GLOB_RECURSE source "*.cpp")
set(Main_File main)
set(CMAKE_CXX_STANDARD 11)

set(APP_DIR "${CMAKE_CURRENT_LIST_DIR}" CACHE PATH "Application directory")

set(CMAKE_PREFIX_PATH "${APP_DIR}/../vcpkg/installed/x64-linux/share")
# set(VCPKG_INSTALLED_DIR "/home/hlever/Apps/vcpkg/installed")
# set(VCPKG_TARGET_TRIPLET "x64-linux")

project(${Main_File} CXX)



set(FRIBIDI_DIR "${APP_DIR}/../fribidi-cmake"
    CACHE PATH "Location of 'fribidi'")

set(AR_DIR "${APP_DIR}/../ArabicString"
    CACHE PATH "Location of 'ArabicString'")


add_library(${Main_File} SHARED ${source} "${AR_DIR}/ArabicString.cpp")



# find_package(fmt CONFIG REQUIRED)
find_package(blend2d CONFIG REQUIRED)
# find_package(asmjit CONFIG REQUIRED)

target_include_directories(${Main_File} PRIVATE ${FRIBIDI_DIR} ${AR_DIR})

target_link_libraries(${Main_File} PRIVATE blend2d::blend2d fribidi)
