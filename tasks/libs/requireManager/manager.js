'use strict';

var requireManager = function () {

    // Array to hold all the different steps that need to be executes
    var steps = [];

    var init = function (task, grunt) {

        this.grunt = grunt;
        this.task = task;

        // Task Options
        this.options = task.options({
            requireSetting: false,
            settingFileName: 'component.json',
            buildFileName: 'Gruntfile.js',
            distFolder: 'dist/',
            tempFolder: 'tasks/libs/requireManager/temp/',
            partialFolder: 'tasks/libs/requireManager/_partials',
            baseBuild: 'build.json',
            defaultSetting: {
                  lazy: true,
                  settings: false
            },
            requireSettings: {
                  anonymousWrapper: true,
                  baseUrl: true,
                  fileName: 'settings.js',
                  customInit: false,
                  baseInitFile: 'init.js'
            }
        });

        // Object of default process method
        this.assets = {
            script: {
                ext: 'js',
                process: 'singleFile',
                lazyLoadPath: 'components/'
            },
            style: {
                ext: 'css',
                process: 'singleFile',
                lazyLoadPath: '../css/components/'
            }
        };

        // Object to hold the different components.
        this.lazyComponents = {};
        this.lazyDefinitions = {};
        this.includeComponents = {};
        this.includeDefinitions = {};

        // Object to hold the component namespace
        this.components = {};

        // Return itself so the process can move on.
        return this;

    };

    var addStep = function (func) {

        // Add function to step array
        steps.push(func);

        // Return itself so the process can move on.
        return this;

    };

    // Function will cause all the buffered steps to begin
    var execute = function (callback) {

        var self = this;

        // See if no steps remain
        if (steps.length === 0) {

            if (callback) {
                callback(null, true);
            }

            return true;

        }

        // Set the starting step
        var step = 0;

        // Execute the next step in the steps array, plus pass it a callback.
        steps[step++](self, function next(requireManager) {

            if (step < steps.length) {

                steps[step++](self, next);

            }
            else {

                if (callback) {
                    callback(null, true);
                }

                return true;

            }

        });


    };

    return {
        init: init,
        addStep: addStep,
        execute: execute
    };

};

module.exports = exports = new requireManager();