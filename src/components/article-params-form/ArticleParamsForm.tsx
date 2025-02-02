import { createRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState } from 'react';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr, OptionType } from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Spacing } from 'src/ui/spacing';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	updateStyle: (newStyle: {}) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpen, openForm] = useState<boolean>(false);

	const changeFormPosition = () => {
		openForm(!isOpen)
	}
	const rootRef = createRef<HTMLDivElement>()
	useOutsideClickClose({
		isOpen,
		rootRef: rootRef,
		onClose: changeFormPosition,
		onChange: openForm,
	})

	const [selectedFont, setSelectedFont] = useState<OptionType>(fontFamilyOptions[0]);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(fontSizeOptions[0]);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(fontColors[0]);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState<OptionType>(backgroundColors[0]);
	const [selectedContentWidthArr, setSelectedContentWidthArr] = useState<OptionType>(contentWidthArr[0]);

	const clear = () => {
		setSelectedFont(fontFamilyOptions[0])
		setSelectedFontSize(fontSizeOptions[0])
		setSelectedFontColor(fontColors[0])
		setSelectedBackgroundColor(backgroundColors[0])
		setSelectedContentWidthArr(contentWidthArr[0])
	}

	const apply = () => {
		props.updateStyle({
			"--bg-color": selectedBackgroundColor.value,
			"--container-width": selectedContentWidthArr.value,
			"--font-color": selectedFontColor.value,
			"--font-size": selectedFontSize.value,
			"--font-family": selectedFont.value
		})
	}

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={changeFormPosition} />
			<aside ref={rootRef} className={isOpen ? styles.container + " " + styles.container_open : styles.container}>
				<form className={styles.form}>
					<Text
						as={"h2"}
						children="задайте параметры"
						weight={800}
						size={31}
						family='open-sans'
						uppercase={true}
					/>
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
						<Button onClick={clear} title='Сбросить' htmlType='reset' type='clear' />
						<Button onClick={apply} title='Применить' htmlType='button' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
