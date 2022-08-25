import {useNumberFieldState} from 'react-stately';
import {useLocale, useNumberField} from 'react-aria';

function NumberField(props) {
  let { locale } = useLocale();
  let state = useNumberFieldState({ ...props, locale });
  let inputRef = React.useRef();
  let {
    labelProps,
    groupProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps
  } = useNumberField(props, state, inputRef);

  return (
    <div>
      <label {...labelProps}>{props.label}</label>
      <div {...groupProps}>
        <button {...decrementButtonProps}>-</button>
        <input {...inputProps} ref={inputRef} />
        <button {...incrementButtonProps}>+</button>
      </div>
    </div>
  );
}

<NumberField
  label="Price"
  defaultValue={6}
  formatOptions={{
    style: 'currency',
    currency: 'USD'
  }}
/>
