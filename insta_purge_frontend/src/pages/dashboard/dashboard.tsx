import React, { Component } from "react";
import "./dashboard.scss";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import PersonIcon from "@material-ui/icons/Person";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {
  getInstaAccounts,
  addInstaAccount,
  deleteInstaAccount,
} from "./store/actions";
import { connect } from "react-redux";
import { defaultState } from "../../store/reducers";
import { instaAccount, newInstaAccount } from "./dashboard.models";
import AddInstaAccountDialog from "./components/add-insta-account-dialog/add-insta-account-dialog";

function AccountBlock(props: { account: instaAccount; onDel: Function }) {
  return (
    <div className="account_block">
      <div style={{ flexGrow: 14 }} />
      <div className="acc-text"> @{props.account.userName}</div>
      <div style={{ flexGrow: 9 }} />
      <div onClick={() => props.onDel(props.account)} className="delete-icon">
        <DeleteForeverIcon />
      </div>
    </div>
  );
}
function DashboardBlock(props: { account_name: string }) {
  return <div className="dashboard_block">{props.account_name}</div>;
}
function AccountAccordion(props: {
  accounts: instaAccount[];
  onAdd: Function;
  onDel: Function;
}) {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [openAdditionDialog, setOpenAdditionDialog] = React.useState(false);

  const toggleAccordion = () => () => {
    setExpanded(!expanded);
  };
  const onAddInstaAccount = (value: newInstaAccount) => {
    setOpenAdditionDialog(false);
    props.onAdd(value);
  };
  const onDelInstaAccount = (value: instaAccount) => {
    props.onDel(value);
  };
  return (
    <div>
      <Accordion square expanded={expanded} onChange={toggleAccordion()}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <div className="account-header">
            <PersonIcon /> : @
            {props.accounts[0] ? props.accounts[0].userName : ""}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="accounts">
            {props.accounts.map((account: instaAccount) => (
              <AccountBlock
                key={account.id}
                account={account}
                onDel={(v: instaAccount) => {
                  onDelInstaAccount(v);
                }}
              />
            ))}
            <div
              className="account_block"
              onClick={() => setOpenAdditionDialog(true)}
            >
              <AddCircleIcon />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <AddInstaAccountDialog
        open={openAdditionDialog}
        onClose={onAddInstaAccount}
      />
    </div>
  );
}

class Dashboard extends Component<
  {
    all_insta_accounts: any;
    getInstaAccounts: any;
    addInstaAccount: any;
    deleteInstaAccount: any;
  },
  { drawerOpen: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { drawerOpen: true };

    //dispatches
    props.getInstaAccounts();
  }
  onAdd(account: newInstaAccount) {
    if (account !== undefined) {
      this.props.addInstaAccount(account);
    }
  }
  onDel(account: instaAccount) {
    console.log(account);
    if (account !== undefined) {
      this.props.deleteInstaAccount(account);
    }
  }
  render() {
    return (
      <div>
        <Drawer variant="persistent" anchor="left" open={this.state.drawerOpen}>
          <div className="drawer">
            <div className="account_select">
              <AccountAccordion
                accounts={this.props.all_insta_accounts}
                onAdd={(v: newInstaAccount) => {
                  this.onAdd(v);
                }}
                onDel={(v: instaAccount) => {
                  this.onDel(v);
                }}
              />
            </div>
            <Divider />
            <div className="dashboard_select">
              {["d1", "d2", "d3"].map((db) => (
                <DashboardBlock account_name={db} />
              ))}
            </div>
          </div>
        </Drawer>
        <main>Contents</main>
      </div>
    );
  }
}

const mapStateToProps = (state: defaultState) => ({
  all_insta_accounts: state.dashboard.instaAccounts,
});
const mapDispatchToProps = {
  getInstaAccounts,
  addInstaAccount,
  deleteInstaAccount,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
