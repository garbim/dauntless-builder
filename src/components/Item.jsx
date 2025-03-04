import React from "react";
import PropTypes from "prop-types";

import CellGroup from "./CellGroup";

import ItemIcon from "./ItemIcon";
import ItemData from "./ItemData";
import ItemUtility from "../utility/ItemUtility";
import PropTypeUtility from "../utility/PropTypeUtility";

export default class Item extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};
    }

    getItemType() {
        let type = this.props.defaultType;

        if(this.props.item) {
            type = this.props.item.type;
        }

        return ItemUtility.itemType(type);
    }

    onClicked() {
        let filterOption = {};
        filterOption.__itemType = this.getItemType();
        filterOption.__itemLevel = this.props.level;
        filterOption.filters = [];

        if(filterOption.__itemType === "Weapon" && this.props.item) {
            filterOption.__weaponType = this.props.item.type;
        }

        if(filterOption.__itemType === "Armour") {
            filterOption.__armourType = this.props.defaultType;

            filterOption.filters.push({
                field: "type",
                value: this.props.defaultType
            });
        }

        this.props.onItemClicked(filterOption);
    }

    render() {
        if(!this.props.item) {
            return <div className="item-title-wrapper">
                <div className="item-wrapper">
                    <div className="item no-item" onClick={() => this.onClicked()}>
                        <i className="fas fa-question no-item-icon"></i>
                        <div className="item-data">
                            <h3 className="subtitle">No <strong>{this.props.title}</strong> selected.</h3>
                            <div>Click here to select one.</div>
                        </div>
                    </div>
                </div>
            </div>;
        }

        const hasCells = this.props.item.cells && this.props.item.cells.length > 0;

        return <div className="item-title-wrapper">
            <h2 className="subtitle hidden-on-large-screens">{this.getItemType() + (this.props.item.type ? ` - ${this.props.item.type}` : "")}</h2>
            <div className="item-wrapper">
                <div className={"item"+ (!hasCells ? " no-cells" : "")} title={this.props.item.description} onClick={() => this.onClicked()}>
                    <ItemIcon item={this.props.item} defaultType={this.props.defaultType} />
                    <ItemData item={this.props.item} level={this.props.level} />
                </div>
                <CellGroup
                    item={this.props.item}
                    cells={this.props.cells}
                    defaultType={this.props.defaultType}
                    onCellClicked={this.props.onCellClicked}
                    parent={this.props.parent} />
            </div>
        </div>;
    }
}

Item.propTypes = {
    item: PropTypeUtility.item(),
    title: PropTypes.string,
    parent: PropTypes.object,
    cells: PropTypes.array,
    defaultType: PropTypes.string,
    level: PropTypes.number,
    onItemClicked: PropTypes.func,
    onCellClicked: PropTypes.func
};
