var apptabinitializer = {

    ListBoxName : "uriListBox",

    onLoad: function(event) {
        // Encourage garbage collection
        window.removeEventListener("load", apptabinitializer.onLoad, false);

        var uriList = apptabinitializerPreferences.getURIList();
        if (uriList.length != 0) {
            var listBox = document.getElementById(this.ListBoxName);
            for ( var i = 0; i < uriList.length; i++) {
                gBrowser.pinTab(gBrowser.addTab(uriList[i]));
            }
        }
        this.initialized = true;
    },

    isFirstBrowserWindow: function() {
        var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
                .getService(Components.interfaces.nsIWindowMediator);
        var browserEnumerator = wm.getEnumerator("navigator:browser");

        var count = 0;
        while (browserEnumerator.hasMoreElements()) {
            count++;
            browserEnumerator.getNext();
        }
        return (count == 1);
    }
};

if (apptabinitializer.isFirstBrowserWindow()) {
    window.addEventListener("load", apptabinitializer.onLoad, false);
}
