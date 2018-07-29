import { ComponentClass, ReactElement, ReactNode } from 'react';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { DateType } from '../constants/prop-types';
import { Utils } from '../typings/utils';
import { MaterialUiPickersDate } from '../typings/date'
import {CalendarHeaderProps} from "./CalendarHeader"

export type DayComponent = ReactElement<IconButtonProps>;

export type RenderDay = (
    day: MaterialUiPickersDate,
    selectedDate: MaterialUiPickersDate,
    dayInCurrentMonth: boolean,
    dayComponent: DayComponent,
) => ReactNode;

export type RenderHeader = (
  headerComponent: ReactElement<CalendarHeaderProps>,
  props: CalendarProps,
) => ReactNode;

export interface CalendarProps {
    date: MaterialUiPickersDate;
    minDate?: DateType;
    maxDate?: DateType;
    onChange: (date: MaterialUiPickersDate) => void;
    disablePast?: boolean;
    disableFuture?: boolean;
    leftArrowIcon?: ReactNode;
    rightArrowIcon?: ReactNode;
    renderDay?: RenderDay;
    utils?: Utils<MaterialUiPickersDate>;
    shouldDisableDate?: (day: MaterialUiPickersDate) => boolean;
    onMonthChange?: (date: MaterialUiPickersDate) => void;
    renderHeader?: RenderHeader;
}

declare const Calendar: ComponentClass<CalendarProps>;

export default Calendar;
