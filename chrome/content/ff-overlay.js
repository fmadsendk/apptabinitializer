apptabinitializer.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ apptabinitializer.showFirefoxContextMenu(e); }, false);
};

apptabinitializer.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-apptabinitializer").hidden = gContextMenu.onImage;
};

window.addEventListener("load", function () { apptabinitializer.onFirefoxLoad(); }, false);
