import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import VendingItem from "./VendingItem";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import { getVendings } from "../../actions/vending";
import { connect } from "react-redux";
import AddVending from "./AddVending";

const options = [
  { value: "All", label: "All" },
  { value: "Tunis", label: "Tunis" },
  { value: "Ariana", label: "Ariana" },
  { value: "Ben Arous", label: "Ben Arous" },
  { value: "Manouba", label: "Manouba" },
  { value: "Nabeul", label: "Nabeul" },
  { value: "Zaghouan", label: "Zaghouan" },
  { value: "Bizerte", label: "Bizerte" },
  { value: "Béja", label: "Béja" },
  { value: "Jendouba", label: "Jendouba" },
  { value: "Kef", label: "Kef" },
  { value: "Siliana", label: "Siliana" },
  { value: "Sousse", label: "Sousse" },
  { value: "Monastir", label: "Monastir" },
  { value: "Mahdia", label: "Mahdia" },
  { value: "Sfax", label: "Sfax" },
  { value: "Kairouan", label: "Kairouan" },
  { value: "Kasserine", label: "Kasserine" },
  { value: "Sidi Bouzid", label: "Sidi Bouzid" },
  { value: "Gabès", label: "Gabès" },
  { value: "Mednine", label: "Mednine" },
  { value: "Tataouine", label: "Tataouine" },
  { value: "Gafsa", label: "Gafsa" },
  { value: "Tozeur", label: "Tozeur" },
  { value: "Kebili", label: "Kebili" }
];

const Vendings = ({ getVendings, vending: { vendings, loading } }) => {
  useEffect(() => {
    getVendings();
  }, [loading]);

  const [region, setRegion] = useState("All");

  return loading ? (
    <Spinner />
  ) : (
    <div className="content-body">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  <div className="row">
                    <div className="col-10">
                      <Select
                        options={options}
                        onChange={v => setRegion(v.value)}
                        defaultValue={{ value: "All", label: "All" }}
                      />
                    </div>
                    <div className="col-2">
                      <AddVending></AddVending>
                    </div>
                  </div>
                </h4>
                <div className="basic-form">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Serial Number</th>
                          <th scope="col">Adress</th>
                          <th scope="col">Status</th>
                          <th scope="col">Nb Vends</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vendings.map(
                          vending =>
                            (region === "All" || vending.region === region) && (
                              <VendingItem
                                key={vending._id}
                                vending={vending}
                              />
                            )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Vendings.propTypes = {};

const mapStateToProp = state => ({
  vending: state.vending
});
export default connect(mapStateToProp, { getVendings })(Vendings);
