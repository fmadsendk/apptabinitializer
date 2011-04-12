var apptabinitHelper = {
    ListPrefName : "extensions.apptabinitializer.urilist",
    ListBoxName : "uriListBox",

    // Services

    getMainWindow : function() {
        var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
                .getService(Components.interfaces.nsIWindowMediator);
        return wm.getMostRecentWindow("navigator:browser");
    },

    getPrefManager : function() {
        return Components.classes["@mozilla.org/preferences-service;1"]
                .getService(Components.interfaces.nsIPrefBranch);
    },

    // Event handlers

    loadPreferences : function() {
        this.fillListBox(this.getURIListPreference());
    },

    savePreferences : function() {
        var str = this.getListBoxContentAsString();
        this.getPrefManager().setCharPref(this.ListPrefName, str);
        return true;
    },

    grabAppTabs : function() {
        var uriList = this.getCurrentAppTabURIs();
        this.clearListBox();
        this.fillListBox(uriList);
    },

    // Preferences

    getURIListPreference : function() {
        var pm = this.getPrefManager();
        if (pm.getPrefType(this.ListPrefName) == pm.PREF_STRING) {
            var str = pm.getCharPref(this.ListPrefName);
            if (str.length != 0) {
                return str.split(',');
            }
        }
        return [];
    },

    isResumeSessionOnce : function() {
        const ResumePref = "browser.sessionstore.resume_session_once";
        var pm = this.getPrefManager();
        if (pm.getPrefType(ResumePref) == pm.PREF_BOOL) {
            return pm.getBoolPref(ResumePref);
        }
        return false;
    },

    // Browser

    getCurrentAppTabURIs : function() {
        var tabbrowser = this.getMainWindow().gBrowser;
        var uriList = [];
        for ( var i = 0; i < tabbrowser.browsers.length; i++) {
            var tab = tabbrowser.tabContainer.childNodes[i];
            if (tab.pinned) {
                var currentBrowser = tabbrowser.getBrowserAtIndex(i);
                uriList[uriList.length] = currentBrowser.currentURI.spec;
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
