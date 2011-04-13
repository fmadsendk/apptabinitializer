var apptabinitializerPreferences = {

    ListPrefName : "extensions.apptabinitializer.urilist",

    getPrefManager : function() {
        return Components.classes["@mozilla.org/preferences-service;1"]
                .getService(Components.interfaces.nsIPrefBranch);
    },

    getURIList : function() {
        var pm = this.getPrefManager();
        if (pm.getPrefType(this.ListPrefName) == pm.PREF_STRING) {
            var str = pm.getCharPref(this.ListPrefName);
            if (str.length != 0) {
                return str.split(',');
            }
        }
        return [];
    },

    setURIList : function(str) {
        this.getPrefManager().setCharPref(this.ListPrefName, str);
    }
};
