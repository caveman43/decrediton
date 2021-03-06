import compose from "lodash/fp/compose";
import { FormattedMessage as T, injectIntl, defineMessages } from "react-intl";
import { AddressInput, DcrInput } from "inputs";
import "../../../../style/SendPage.less";

const messages = defineMessages({
  destinationAddrPlaceholder: {
    id: "send.destinationAddrPlaceholder",
    defaultMessage: "Destination Address"
  },
  amountPlaceholder: {
    id: "send.amountPlaceholder",
    defaultMessage: "Amount"
  }
});

const SendOutputRow = ({
  index,
  outputs,
  destination,
  amountStr,
  addressError,
  amountError,
  onAddOutput,
  getOnRemoveOutput,
  getOnChangeOutputDestination,
  getOnChangeOutputAmount,
  isSendAll,
  intl
}) => (
  <div className="send-row">
    <div className="send-output-row">
      <div className="send-label"><T id="send.to" m="To" />:</div>
      <div className="send-address">
        <div className="send-input-form">
          <AddressInput
            showErrors={true}
            invalid={!!addressError}
            invalidMessage={addressError}
            value={destination}
            className="send-address-hash-to"
            placeholder={intl.formatMessage(messages.destinationAddrPlaceholder)}
            onChange={compose(getOnChangeOutputDestination(index), e => e.target.value)}
          />
        </div>
        {index === 0 && !isSendAll ? (
          <div className="send-address-wallet-icon" onClick={onAddOutput}></div>
        ) : (index === 0 && isSendAll) ? (
          <div className="send-address-icon-spacer"></div>
        ) : (index === (outputs.length - 1)) && !isSendAll ? (
          <div className="send-address-delete-icon" onClick={getOnRemoveOutput}></div>
        ) : ( null ) }
      </div>
      <div className="send-amount">
        <div className="send-amount-label">
          {index === 0 ? <span><T id="send.amount" m="Amount" />:</span> : null}
        </div>
        <div className="send-address-amount-sum-and-currency">
          <DcrInput
            showErrors={true}
            hidden={!isSendAll}
            className="send-address-input-amount"
            disabled={true}
            value={amountStr}
          />
          <DcrInput
            showErrors={true}
            invalid={!!amountError}
            invalidMessage={amountError}
            hidden={isSendAll}
            value={amountStr}
            className="send-address-input-amount"
            placeholder={intl.formatMessage(messages.amountPlaceholder)}
            onChange={compose(getOnChangeOutputAmount(index), e => e.target.value)}
          />
        </div>
      </div>
    </div>
  </div>
);

export default injectIntl(SendOutputRow);
