import {
  Option,
  ItemProps,
  ValueType,
  UseSelectProps,
  UseSelectOutput
} from '../../types'
import useFocusHandler from './use-focus-handler'
import useClickHandler from './use-click-handler'
import useBlurHandler from './use-blur-handler'
import useSelectHandler from './use-select-handler'
import useSearchBlurHandler from './use-search-blur-handler'
import useEscapeKeyDownHandler from './use-escape-keydown-handler'
import useSearchKeyDownHandler from './use-search-keydown-handler'
import useSelectKeyDownHandler from './use-select-keydown-handler'
import useEnterOrSpaceKeyDownHandler from './use-enter-or-space-keydown-handler'
import useArrowsKeyDownHandler from './use-arrows-keydown-handler'
import useResetClickHandler from './use-reset-click-handler'
import useSearchChangeHandler from './use-search-change-handler'
import useItemOnMouseDownHandler from './use-item-on-mouse-down-handler'
import useItemOnMouseEnter from './use-item-on-mouse-enter-handler'
import useItemOnClick from './use-item-on-click-handler'

const useSelectProps = <T extends ValueType, M extends boolean = false>(
  props: UseSelectProps<T, M>
): UseSelectOutput => {
  const handleFocus = useFocusHandler(props)
  const handleClick = useClickHandler(props)
  const handleBlur = useBlurHandler(props)
  const handleSelect = useSelectHandler(props)
  const handleSearchBlur = useSearchBlurHandler(props)
  const handleEscapeKeyDown = useEscapeKeyDownHandler(props)
  const handleEnterOrSpaceKeyDown = useEnterOrSpaceKeyDownHandler({
    ...props,
    handleSelect
  })
  const handleArrowsKeyDown = useArrowsKeyDownHandler(props)
  const handleResetClick = useResetClickHandler({
    ...props,
    handleSelect
  })
  const handleSearchChange = useSearchChangeHandler(props)
  const handleItemOnMouseDown = useItemOnMouseDownHandler()
  const handleItemOnMouseEnter = useItemOnMouseEnter(props)
  const handleItemOnClick = useItemOnClick({ ...props, handleSelect })
  const handleSearchKeyDown = useSearchKeyDownHandler({
    ...props,
    handleArrowsKeyDown,
    handleEnterOrSpaceKeyDown,
    handleEscapeKeyDown
  })
  const handleSelectKeyDown = useSelectKeyDownHandler({
    ...props,
    handleArrowsKeyDown,
    handleEnterOrSpaceKeyDown,
    handleEscapeKeyDown
  })

  const getItemProps = (item: Option, index: number): ItemProps => ({
    onMouseEnter: () => handleItemOnMouseEnter(index),
    onMouseDown: handleItemOnMouseDown,
    onClick: (event: React.MouseEvent) => handleItemOnClick(event, item)
  })

  const getRootProps = () => ({
    onFocus: handleFocus,
    onClick: handleClick,
    onBlur: handleBlur
  })

  const getInputProps = () => ({
    onKeyDown: handleSelectKeyDown,
    onResetClick: handleResetClick
  })

  const getSearchInputProps = () => ({
    onChange: handleSearchChange,
    onKeyDown: handleSearchKeyDown,
    onBlur: handleSearchBlur
  })

  return {
    getItemProps,
    getRootProps,
    getInputProps,
    getSearchInputProps
  }
}

export default useSelectProps
