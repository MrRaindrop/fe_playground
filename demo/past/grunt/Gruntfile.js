module.exports = function (grunt) {
 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /*clean: {
            spm: ['dist'],
        },*/
        transport: {
            dialog: {
                src: 'src/*.js',
                dest: 'dist'
            }
        },
        concat: {
            test: {
                src: ['src/backbone.js', 'src/Chart.js'],
                dest: 'dist/test.js',
            }
        },
        /*watch: {
            scripts: {
                files: ['src/backbone.js', 'src/Chart.js'],
                tasks: ['concat'],
                options: {
                    spawn: false
                },
            }
        },*/
        uglify: {
            options: {
                report: 'gzip',
                mangle: true,   // Specify mangle: false to prevent changes to your variable and function names.
                banner: '/** \n' +
                        ' * -------------------------------------------------------------\n' +
                        ' * Copyright (c) 2013 Jankerli, All rights reserved. \n' +
                        ' * http://www.jankerli.com/ \n' +
                        ' *  \n' +
                        ' * @version: <%= pkg.version%> \n' +
                        ' * @author: <%= pkg.author%> \n' +
                        ' * @description: <%= pkg.description%> \n' +
                        ' * ------------------------------------------------------------- \n' +
                        ' */ \n\n'
            },
            myTarget: {
                files: {
                    'dist/test.min.js': ['src/backbone.js', 'src/Chart.js'],
                    'dist/testmin.js': ['dist/test.js']
                }
            }
        }
        /*less: {
            // 编译
            compile: {
                files: {
                    'assets/css/main.css': 'assets/css/main.less'
                }
            },
            // 压缩
            yuicompress: {
                files: {
                    'assets/css/main-min.css': 'assets/css/main.css'
                },
                options: {
                    yuicompress: true
                }
            }
        },
        watch: {
            scripts: {
                files: ['assets/css/*.less'],
                tasks: ['less']
            }
        }*/
    });
 
    // grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-cmd-transport');
    // grunt.loadNpmTasks('grunt-contrib-watch');
 
    grunt.registerTask('default', ['transport', 'concat', 'uglify']);
 
};