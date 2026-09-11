/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'EvalApp.Application',

    name: 'EvalApp',

    requires: [
        // This will automatically load all classes in the EvalApp namespace
        // so that application classes do not need to require each other.
        'EvalApp.*'
    ],

    // The name of the initial view to create.
    mainView: 'EvalApp.view.main.Main'
});
