| [Home](../README.md) |
|--------------------------------------------|

# Installation
1. To install a widget, click **Content Hub** > **Discover**.
2. From the list of widget that appears, search for and select **Record Distribution**.
3. Click the card of the **Record Distribution** widget.
4. Click **Install** on the bottom to begin installation.

# Configuration

## Record Distribution Widget Settings

The configuration settings of the Record Distribution widget is slightly different for dashboards or reports and the detail view of a module's detail view. The reason is that in the case of dashboards or reports, you can choose any module and view its records based on the specified grouping. However, in the case of the detail view of a module's record, you can choose only those modules that are related to that module. 

Provide the following details to customize the Record Distribution  widget to suit your requirements:

| Fields                                   | Description                              |
| ---------------------------------------- | ---------------------------------------- |
| Title                                    | Specify the heading or title of the visual depiction of each record node in the group. |
| Select Data Source (Dashboards or Reports) OR <br />Select Related Data Source (View Panels) | Select the module (data source) whose records you want to group in Dashboards or Reports. For example, **Assets**. OR <br />Select the related module whose records you want to group in View Panels. |
| Picklist                                 | Select the picklist using which you want to group the records in the chosen module. For example, **Level**. |
| Picklist Items                           | Choose the items of the picklist to be displayed by the widget. By default all items of the selected picklist are populated in this field. For example, when you select Level as the Picklist, then the Picklist Items field get populated with all the items of the "Level" Picklist, i.e., Level 5.5, Level 5, Level 4, Level 3.5, Level 3, Level 2.5, Level 2, Level 1.5, and Level 1. You can choose to remove the levels that you do not want the widget to display, for example, Level 5, Level 4, Level 3, Level 2, and Level 1. |
| Icon for Record View                     | Select a field of type 'Lookup' field using which you want to display the icons representing asset records. For example, **Asset Icon** to display icons for asset records based on their type such as laptops, servers, etc. For more information, see the [Setting up modules to include icons that represent records](#SetUpModules) topic. |
| Show Correlation Edges                   | Select this option if you want visual lines to be added on the view to depict correlations between records from the same module that are grouped at various levels. |
| Record Assignment (Default Filter)       | Select **Only Me** to display only those records that are assigned to the logged-in user and based on the defined filters. <br />Select **All** to display all records based on the defined filters. |
| Assignment Fields                        | Select the field based on which records are assigned for the select module. |
| Filter Criteria                          | Define the filter criteria using which you want to filter the data retrieved by this widget, and ensuring that only requisite data gets fetched and displayed in this widget. <br />**NOTE**: A maximum of 100 records are fetched for rendering details. <br />Filters can be applied for example to display the widget with only those asset records that have related ICS Advisory records, whose IDs are not 'null'. Or, if you want the widget to display only those assets state is 'Active' and whose criticality is 'Very Critical' or 'Critical', you can define the filter criteria as shown in the following image:<br /><img src="https://raw.githubusercontent.com/fortinet-fortisoar/widget-record-distribution/release/1.0.0/docs/media/definingFilter.png" alt="Defining filters to restrict data fetched by the widget" style="border: 1px solid #A9A9A9; border-radius: 4px; padding: 10px; display: block; margin-left: auto; margin-right: auto;"> |

### Setting up modules to include icons that represent records<a name="SetUpModules"></a>

If you want to display icons that represent records, then you need to add a 'Lookup' field to the module (data source) whose records you want to group. For example, if you want to display the assets grouped by their levels and want to display icons that represent the asset records based on the type of asset such as, server, laptops, etc, do the following in your FortiSOAR instance:

1. Create a new module named 'Asset Resources' which will store the icons that represent asset records with the following fields:
    1. Type: Text Field  
        Define the uniqueness constraint for the 'Asset Resources' module on the 'Type' field.
    2.   Icon: File Field 
    3.   Description: Text Field
    4.   Save and Publish the updated 'Asset Resources' module.
2. In the 'Assets' module, add a 'Lookup' field named 'Asset Icon'  as follows:
    1.   Field Type: Lookup (One to Many or One to One)
    2.   Related Module: Asset Resources
    3.   Field Title: Asset Icon
    4.   Edit the other properties of the type field as required.  
        <img src="https://raw.githubusercontent.com/fortinet-fortisoar/widget-record-distribution/release/1.0.0/docs/media/editingAssetsModule.png" alt="Editing the Assets Module to add the Type lookup field" style="border: 1px solid #A9A9A9; border-radius: 4px; padding: 10px; display: block; margin-left: auto; margin-right: auto;">
    5.   Save and Publish the updated 'Assets' module.

After you have set up the required modules, i.e, the new 'Asset Resources' module, and the updated 'Assets' module, you can add required asset resources records. For example, to add a 'Server' record in the 'Asset Resources' module, do the following:

1. Click **Add** on the 'Asset Resources' page.
2. In the **Type** field, enter `Server`.
3. In the **Icon** field, drag-and-drop the icon or browse to the icon that you to use to represent that asset type, 'Server' in our example.  
   <img src="https://raw.githubusercontent.com/fortinet-fortisoar/widget-record-distribution/release/1.0.0/docs/media/addAssetType.png" alt="Adding an asset of type laptop in the Asset Types Module" style="border: 1px solid #A9A9A9; border-radius: 4px; padding: 10px; display: block; margin-left: auto; margin-right: auto;">
4. In the **Description** field, optionally, enter the description of the asset type.
5. Save the record.

Now, when you select **Asset Icon** from **Icon for Record View** while configuring the Record Distribution widget, the icon that you have set for the 'Server' asset type gets rendered in the views of this widget.
