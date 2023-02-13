'use strict';

(function () {
  angular
    .module('cybersponse')
    .factory('recordDistributionService', recordDistributionService);

  recordDistributionService.$inject = ['_', '$interpolate'];

  function recordDistributionService(_, $interpolate) {
    var service = {
      getChartData: getChartData,
    };
    return service;

    /*
     * This method creates map of lookup module id and icon field.
     */
    function _getIconMap(iconDataCollection) {
      var iconValues = {};
      angular.forEach(iconDataCollection, function (iconValue) {
        iconValues[iconValue['@id']] = iconValue.icon;
      });
      return iconValues;
    }

    /*
     * This method creates map of picklist id and item value.
     */
    function _getPicklistMap(pickListFieldItems) {
      var itemValues = {};
      angular.forEach(pickListFieldItems, function (picklistField) {
        itemValues[picklistField['@id']] = picklistField.itemValue;
      });
      return itemValues;
    }

    /*
     * This method is responsible for forming chart data for rendering.
     *
     */
    function getChartData(entity, config, records, iconDataCollection) {
      var chartData = { 'data': [], 'edges': [] };
      if (config.pickListField && (config.pickListFieldItems && config.pickListFieldItems.length > 0) && records.length > 0) {
        let picklistMap = _getPicklistMap(config.pickListFieldItems);
        let iconMap = _getIconMap(iconDataCollection);
        // Form initial list of pick list items and color
        angular.forEach(config.pickListFieldItems, function (fieldItem) {
          var chartItem = {};
          chartItem.itemValue = fieldItem.itemValue;
          if (fieldItem.color) {
            chartItem.color = fieldItem.color;
          }
          chartItem.json = [];
          // Insert records data as per items
          var itemRecords = _.filter(records, function (record) {
            return record[config.pickListField] && picklistMap[record[config.pickListField]] ? picklistMap[record[config.pickListField]] === fieldItem.itemValue : false;
          });
          // Get picklist details
          if (itemRecords.length > 0) {
            chartItem.picklist = itemRecords[0][config.pickListField];
          }
          angular.forEach(itemRecords, function (itemRecord) {
            var recordJson = {};
            recordJson.name = $interpolate(entity.displayTemplate)(itemRecord);
            recordJson.id = itemRecord.id;
            recordJson.uuid = itemRecord.uuid;
            recordJson.image = itemRecord[config.iconField] && iconMap[itemRecord[config.iconField]] ? iconMap[itemRecord[config.iconField]] : null;
            chartItem.json.push(recordJson);

            // Handling for Edge Data
            if (itemRecord[config.resource] && itemRecord[config.resource].length > 0) {
              angular.forEach(itemRecord[config.resource], function (relation) {
                var edge = {};
                edge.from = itemRecord.uuid;
                edge.to = relation.split('/')[4];
                edge.id = edge.from + '-' + edge.to;
                if (!chartData.edges.some(item => item.id === edge.to + '-' + edge.from)) {
                  chartData.edges.push(edge);
                }
              });
            }
          });
          if (chartItem.json.length > 0) {
            chartData.data.push(chartItem);
          }
        });
      }

      return chartData;
    }
  }
})();