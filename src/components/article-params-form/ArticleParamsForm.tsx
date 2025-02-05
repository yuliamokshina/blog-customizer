import { createRef, CSSProperties, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Spacing } from 'src/ui/spacing';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	updateStyle: (newStyle: CSSProperties) => void;
	articleStates: ArticleStateType;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpen, setFormPosition] = useState<boolean>(false);
	const rootRef = createRef<HTMLDivElement>();

	const changeFormPosition = () => {
		setFormPosition(!isOpen);
	};

	const closeForm = () => {
		setFormPosition(false);
	};

	useOutsideClickClose({
		isOpen,
		rootRef: rootRef,
		onClose: closeForm,
		onChange: setFormPosition,
	});

	const [selectedFont, setSelectedFont] = useState<OptionType>(
		props.articleStates.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		props.articleStates.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		props.articleStates.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] =
		useState<OptionType>(props.articleStates.backgroundColor);
	const [selectedContentWidthArr, setSelectedContentWidthArr] =
		useState<OptionType>(props.articleStates.contentWidth);

	const apply = () => {
		props.updateStyle({
			'--bg-color': selectedBackgroundColor.value,
			'--container-width': selectedContentWidthArr.value,
			'--font-color': selectedFontColor.value,
			'--font-size': selectedFontSize.value,
			'--font-family': selectedFont.value,
		} as CSSProperties);
	};

	const clear = () => {
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidthArr(defaultArticleState.contentWidth);
		props.updateStyle({
			'--font-family': defaultArticleState.fontFamilyOption.value,
			'--font-size': defaultArticleState.fontSizeOption.value,
			'--font-color': defaultArticleState.fontColor.value,
			'--container-width': defaultArticleState.contentWidth.value,
			'--bg-color': defaultArticleState.backgroundColor.value,
		} as CSSProperties);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		apply();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={changeFormPosition} />
			<aside
				ref={rootRef}
				className={
					isOpen
						? styles.container + ' ' + styles.container_open
						: styles.container
				}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text
						as={'h2'}
						weight={800}
						size={31}
						family='open-sans'
						uppercase={true}>
						задайте параметры
					</Text>
					<Spacing />
					<Select
						selected={selectedFont}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={setSelectedFont}
					/>
					<Spacing />
					<RadioGroup
						title='размер шрифта'
						options={fontSizeOptions}
						selected={selectedFontSize}
						name='font-size'
						onChange={setSelectedFontSize}
					/>
					<Spacing />
					<Select
						selected={selectedFontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={setSelectedFontColor}
					/>
					<Spacing />
					<Separator />
					<Spacing />
					<Select
						selected={selectedBackgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={setSelectedBackgroundColor}
					/>
					<Spacing />
					<Select
						selected={selectedContentWidthArr}
						options={contentWidthArr}
						title='ширина контента'
						onChange={setSelectedContentWidthArr}
					/>
					<Spacing height={207} />
					<div className={styles.bottomContainer}>
						<Button
							onClick={clear}
							title='Сбросить'
							htmlType='reset'
							type='clear'
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
