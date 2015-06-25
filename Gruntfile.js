
//Developers : Mustapha Raji & Varma Anush
//File : Grunt File
//Version : 1.0.0
//Date : 06/24/2015

 
module.exports = function(grunt) {

  // configure the tasks
  
 grunt.initConfig({
               
               properties: {
     props: 'application.properties'
  } ,
   
 copy: {
     all: {
         cwd: '<%= props.sourceDir %>',
         src: [ '**'],
         dest: '<%= props.buildDir %>',
         expand: true
  },
   
     files: {
          files: [{ src: 'archive.tar', dest: '<%= props.distDir %>' + '/' },{ src: 'archive.zip', dest: '<%= props.distDir %>' +'/' }]
              }
  },

    clean: {
       dir: {
                                 
          src: [ '<%= props.buildDir %>','<%= props.distDir %>']
  },
  
      files: {
          src: [ '*.zip','*.tar']
  },
},

  compress: {
       tar: {
          options: {
              archive: 'archive.tar',
              mode: 'tar'
    },
            expand: true,
            cwd: '<%= props.buildDir %>/',
            src: ['**/*'],
   },

    zip: {
         options: {
                    archive: 'archive.zip',
         mode: 'zip'
    },
        expand: true,
        cwd: '<%= props.buildDir %>/',
        src: ['**/*'],
               }

},

    protractor: {
        options: {
            configFile: "test/protractor/protractor.conf.js", // Default config file
            keepAlive: true, // If false, the grunt process stops when the test fails.
            noColor: false, // If true, protractor will not use colors in its output.
            args: {
            }
        },
        local: {
            options: {
               
                args: {
		          // Arguments passed to the command
			  baseUrl: '<%= props.baseUrl %>/',
			  chromeDriver: 'node_modules/selenium/chromedriver.exe'

		     } // Target-specific arguments
            }
        }
    },


    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'mochaTestresults.txt', // Optionally capture the reporter output to a file
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
        },
        src: ['<%=props.testDir %>'+'/*.js']
      }
    }


  });

 //****** load the tasks   
  grunt.loadNpmTasks('grunt-contrib-copy');  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-zip');
  grunt.loadNpmTasks('grunt-properties-reader');
  grunt.loadNpmTasks('grunt-protractor-runner');
  //***** End Load Tasks
   
  
 
//******* define the tasks
   
  // Build Task
grunt.registerTask(
  'build', 
  'Compiles all of the assets and copies the files to the build directory.', 
  [ 'properties','clean:dir', 'copy:all','archive','copy:files','clean:files']
);
// Compress Task
grunt.registerTask(
  'archive', 
  'Compressing Files', 
  ['compress:zip','compress:tar']
);

//Mocha Unit Test 
  grunt.registerTask(
  'mocha', 
  'run unit test using Mocha', 
  ['properties', 'mochaTest']
);


// protractorTest Test
grunt.registerTask('protractorTest', ['properties', 'protractor']);  

//********** Task DEF END
};




