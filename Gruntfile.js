module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: 'bower_components',

        less: {
            options: {
                includePaths: ['<%= bower %>/less/bootstrap'],
                compress: true
            },
            dist: {
                files: {
                    'css/app.min.css': 'less/app.less'
                }
            }
        },

        uglify: {
            dist: {
                files: {
                    'js/app.min.js': [
                        '<%= bower %>/jquery/jquery.min.js',
                        '<%= bower %>/bootstrap/dist/js/bootstrap.min.js',
                        '<%= bower %>/jquery-validate/dist/jquery.validate.min.js',
                        'js/settings.js',
                        'js/app.js'
                    ]
                }
            }
        },

        sprite: {
            all: {
                src: 'img/sprite-source/*.png',
                dest: 'img/sprite_' + new Date().getTime() + '.png',
                destCss: 'less/sprite.less',
                padding: 5,
                algorithm: 'binary-tree'
            }
        },

        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },

            less: {
                files: 'less/*.less',
                tasks: ['less']
            },

            options: {
                spawn: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-notify');

    grunt.registerTask('build', ['less', 'uglify']);
    grunt.registerTask('default', ['build', 'watch']);
};
