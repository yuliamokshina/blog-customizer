import type { Meta, StoryObj } from '@storybook/react';
import { CSSProperties } from 'react';

import { Spacing } from './Spacing';

const meta: Meta<typeof Spacing> = {
	component: Spacing,
};

export default meta;
type Story = StoryObj<typeof Spacing>;

export const SpacingStory: Story = {
	argTypes: {
		height: {
			options: [4, 24, 50, 90, 207]
		}
	},
	render: (args) => {
		return (
			<div
				style={{ border: 'solid 3px black', width: '100%' } as CSSProperties}>
				<Spacing {...args} />
			</div>
		);
	},
};
