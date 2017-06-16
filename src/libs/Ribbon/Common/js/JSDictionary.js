'use strict';
function jsDictionary() {
    this._items = {};
    this.itemArray = new Array();
    this.AddItem = function (key, value) {
        if (this._items[key] == undefined) {
            this._items[key] = value;
            this.itemArray.push(key);
        }
        else {
            alert("This key '[" + key + "]' already exist in Dictionary. Duplicate entry.");
        }
    };

    this.UpdateItem = function (key, value) {
        if (this._items[key] != undefined) {
            this._items[key] = value;
        }
        else {
            alert("This key '[" + key + "]' does not exist in Dictionary. Please add it to the dictionary first.");
        }
    };

    this.GetItem = function (key) {
        if (this._items[key] != undefined) {
            return this._items[key];
        }
        else {
            alert("This key '[" + key + "]' does not exist in Dictionary. Please add it to the dictionary first.");
        }
    };

    this.DeleteItem = function (key) {
        if (this._items[key] != undefined) {
            this._items[key] = null;
            delete this._items[key];

            var index = this.itemArray.indexOf(key);
            if (index !== -1) {
                this.itemArray.splice(index, 1);
            }
        }
        else {
            alert("This key '[" + key + "]' does not exist in Dictionary. Failed to delete.");
        }
    };

    this.GetLength = function () {
        return this.itemArray.length;
    };

    this.ContainsKey = function (key) {
        if (this._items[key] != undefined) {
            return true;
        }
        else {
            return false;
        }
    };

    this.GetKeys = function () {
        return this.itemArray;
    };

    this.Dispose = function () {
        this._items = {};
        this.itemArray = new Array();
    };

    this.DisposeAll = function () {
        var length = this.itemArray.length;

        //delete individual items
        for (var count = 0; count < length; count++) {
            if (this.itemArray[count] != null) {
                this._items[this.itemArray[count]] = null;
            }
        }

        if (this.itemArray.length > 0) {
            //delete itemArray (containing all keys)
            this.itemArray.splice(0, this.itemArray.length);
        }

        //empty arrays
        this.itemArray = [];
        this._items = {};
    };
}


