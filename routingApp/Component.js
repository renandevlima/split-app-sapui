sap.ui.define( ["sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel", "sap/ui/Device"], function (UIComponent, JSONModel, Device) {
	"use strict";
	return UIComponent.extend("sap.ui.core.sample.RoutingMasterDetail.routingApp.Component", {

		metadata: {
			manifest: "json"
		},

		init : function () {

			var oModel = new JSONModel("routingApp/controller/data.json");
			this.setModel(oModel);
			this.setModel(this.createDeviceModel(), "device");

			var oGlobalModel = new JSONModel();
            
            var oInitialData = {
                employeeList: null
            };

			oGlobalModel.setData(oInitialData);

			this.setModel(oGlobalModel, "globalModel");

			UIComponent.prototype.init.apply(this, arguments);

			this.getRouter().initialize();

			this.getRouter().attachTitleChanged(function(oEvent){
				document.title = oEvent.getParameter("title");
			});
		},
		createDeviceModel : function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		}

	});
});
