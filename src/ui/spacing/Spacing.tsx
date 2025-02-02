import styles from './Spacing.module.scss';

type SpacingProps = {
	/** Размер отступа */
	height?: 4 | 24 | 50 | 90 | 207;
};

export const Spacing = ({
	height = 50
}: SpacingProps) => {
	return <div className={styles[`height${height}`]}></div>;
};
