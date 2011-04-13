var apptabinitializerOptions = {

    ListBoxName : "uriListBox",

    // Event handlers

    loadPreferences : function() {
        this.fillListBox(apptabinitializerPreferences.getURIList());
    },

    savePreferences : function() {
        var str = this.getListBoxContentAsString();
        apptabinitializerPreferences.setURIList(str);
        return true;
    },

    grabAppTabs : function() {
        var uriList = this.getCurrentAppTabURIs();
        this.clearListBox();
        this.fillListBox(uriList);
    },

    // Services

    getMainWindow : function() {
        var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
                .getService(Components.interfaces.nsIWindowMediator);
        return wm.getMostRecentWindow("navigator:browser");
    },

    // Browser

    getCurrentAppTabURIs : function() {
        var tabbrowser = this.getMainWindow().gBrowser;
        var uriList = [];
        for ( var i = 0; i < tabbrowser.browsers.length; i++) {
            var tab = tabbrowser.tabContainer.childNodes[i];
            if (tab.pinned) {
                var currentBrowser = tabbrowser.getBrowserAtIndex(i);
                uriList.push(currentBrowser.currentURI.spec);
            }
        }
        return uriList;
    },

    // Listbox

    getListBoxContentAsString : function() {
        var list = document.getElementById(this.ListBoxName);
        var str = "";
        for ( var i = 0; i < list.getRowCount(); i++) {
            if (i != 0)
                str += ",";
            str += list.getItemAtIndex(i).label;
        }
        return str;
    },

    clearListBox : function() {
        var listBox = document.getElementById(this.ListBoxName);
        while (listBox.getRowCount() > 0)
            listBox.removeItemAt(0);
    },

    fillListBox : function(uriList) {
        if (uriList.length != 0) {
            var listBox = document.getElementById(this.ListBoxName);
            for ( var i = 0; i < uriList.length; i++) {
                listBox.appendItem(uriList[i], "");
            }
        }
    }
};
