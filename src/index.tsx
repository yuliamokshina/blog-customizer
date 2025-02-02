import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [styleVars, setStyleVars] = useState<{}>({
		"--font-family": "Arial, sans-serif",
		"--font-size": "16px",
		"--font-color": "#000000",
		"--container-width": "800px",
		"--bg-color": "#ffffff",
	});

	const updateStyle = (newStyles: {}) => {
		setStyleVars(newStyles)
	}

	return (
		<main
			className={clsx(styles.main)}
			style={
				styleVars as CSSProperties
			}>
			<ArticleParamsForm updateStyle={updateStyle} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
