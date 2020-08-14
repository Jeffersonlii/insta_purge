import React, { Component } from "react";
import "./dashboard.scss";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";

function AccountBlock(props: { account_name: string }) {
  return <div className="account_block">{props.account_name}</div>;
}
function DashboardBlock(props: { account_name: string }) {
  return <div className="dashboard_block">{props.account_name}</div>;
}
function AccountAccordion() {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const toggleAccordion = () => () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Accordion square expanded={expanded} onChange={toggleAccordion()}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <div className="account-header">
            <PersonIcon /> : jeff
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="accounts">
            {["jeff", "jeff2", "temp"].map((account_name) => (
              <AccountBlock account_name={account_name} />
            ))}
            <div className="account_block">
              <AddIcon />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export class Dashboard extends Component<{}, { drawerOpen: boolean }> {
  constructor(props: { drawerOpen: boolean }) {
    super(props);
    this.state = { drawerOpen: true };
  }
  render() {
    return (
      <div>
        <Drawer variant="persistent" anchor="left" open={this.state.drawerOpen}>
          <div className="drawer">
            <div className="account_select">
              <AccountAccordion />
            </div>
            <Divider />
            <div className="dashboard_select">
              {["dashboard 1", "dashboard 2", "dashboard 3"].map(
                (account_name) => (
                  <DashboardBlock account_name={account_name} />
                )
              )}
            </div>
          </div>
        </Drawer>
        <main>Contents</main>
      </div>
    );
  }
}
