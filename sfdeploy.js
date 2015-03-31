define(function(require, exports, module) {
    main.consumes = ["Plugin", "commands", "tabManager", "proc", "fs"];
    main.provides = ["sfdeploy"];
    return main;

    function main(options, imports, register) {
        var Plugin = imports.Plugin;
        var commands = imports.commands;
        var tabs = imports.tabManager;
        var proc = imports.proc;
        var fs = imports.fs;
        /***** Initialization *****/

        var plugin = new Plugin("Ajax.org", main.consumes);
        var emit = plugin.getEmitter();

        function load() {
            console.log('load', commands);
        }

        /***** Methods *****/

        commands.addCommand({
            name: "formatjson",
            bindKey: {
                mac: "Command-Shift-P",
                win: "Ctrl-Shift-P"
            },
            exec: function(editor, tabs) {
                console.log("Success!");
                if (editor && editor.ace)
                        console.log(editor.ace);                
                
                console.log("activeDocument: ", editor.activeDocument.tab.path);

                
                
                proc.execFile("node", { 
                    args: ["metaTest.js"],
                    cwd: "/root/lightning"
                }, function(err, stdout, stderr) {
                    if (err) return console.error(err);
                
                    console.log(stderr, stdout);
                });                
                
            },
            isAvailable: function(editor) {
                //console.log('asdfasdf');
                return true;
            }
        }, plugin);

        /***** Lifecycle *****/

        plugin.on("load", function() {
            load();
        });
        plugin.on("unload", function() {

        });

        /***** Register and define API *****/

        plugin.freezePublicAPI({

        });

        register(null, {
            "sfdeploy": plugin
        });
    }
});