import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import setDisplayName from 'recompose/setDisplayName';
import withHandlers from 'recompose/withHandlers';
import withRenderProps from 'recompose/withRenderProps';
import withState from 'recompose/withState';

import withUtils from '../_shared/WithUtils';

const getInitialDate = ({ utils, value, initialFocusedDate }) => {
  const initialDate = value || initialFocusedDate || utils.date();
  const date = utils.date(initialDate);

  return utils.isValid(date) ? date : utils.date();
};

export const BasePickerHoc = compose(
  withUtils(),
  setDisplayName('BasePicker'),
  withState('date', 'changeDate', getInitialDate),
  withState('isAccepted', 'handleAcceptedChange', false),
  lifecycle({
    componentDidUpdate(prevProps) {
      const { utils, value } = this.props;
      if (prevProps.value !== value || prevProps.utils.locale !== utils.locale) {
        this.props.changeDate(getInitialDate(this.props));
      }
    },
  }),
  withHandlers({
    handleClear: ({ onChange }) => () => onChange(null),
    handleAccept: ({ onChange, date }) => () => onChange(date),
    handleSetTodayDate: ({ changeDate, utils }) => () => changeDate(utils.date()),
    handleTextFieldChange: ({ changeDate, onChange }) => (date) => {
      if (date === null) {
        onChange(null);
      } else {
        changeDate(date, () => onChange(date));
      }
    },
    pick12hOr24hFormat: ({ format, labelFunc, ampm }) => (default12hFormat, default24hFormat) => {
      if (format || labelFunc) {
        return format;
      }

      return ampm ? default12hFormat : default24hFormat;
    },
    handleChange: ({
      autoOk,
      changeDate,
      onChange,
      handleAcceptedChange,
    }) => (newDate, isFinish = true) => {
      changeDate(newDate, () => {
        if (isFinish && autoOk) {
          onChange(newDate);
          // pass down accept true, and make it false in the next tick
          handleAcceptedChange(true, () => handleAcceptedChange(false));
        }
      });
    },
  }),
);

export default withRenderProps(BasePickerHoc);

