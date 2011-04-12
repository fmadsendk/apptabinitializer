var apptabinitializer = {
    onLoad : function() {
        if (!apptabinitHelper.isResumeSessionOnce()) {
            var uriList = apptabinitHelper.getURIListPreference();
            if (uriList.length != 0) {
                var listBox = document
                        .getElementById(apptabinitHelper.ListBoxName);
                for ( var i = 0; i < uriList.length; i++) {
                    gBrowser.pinTab(gBrowser.addTab(uriList[i]));
                }
            }
        }
        this.initialized = true;
    }
};

window.addEventListener("load", function() {
    apptabinitializer.onLoad();
}, false);
