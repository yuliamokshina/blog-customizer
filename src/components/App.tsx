import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './article/Article';
import { ArticleParamsForm } from './article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../constants/articleProps';

import '../styles/index.scss';
import styles from '../styles/index.module.scss';

export const App = () => {
	const [styleVars, setStyleVars] = useState<CSSProperties>({
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	} as CSSProperties);

	return (
		<main className={clsx(styles.main)} style={styleVars}>
			<ArticleParamsForm
				updateStyle={setStyleVars}
				articleStates={defaultArticleState}
			/>
			<Article />
		</main>
	);
};
