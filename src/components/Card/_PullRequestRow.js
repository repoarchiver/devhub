// @flow

import React from 'react';
import Icon from 'react-native-vector-icons/Octicons';

import { withTheme } from 'styled-components/native';
import TransparentTextOverlay from '../TransparentTextOverlay';
import UserAvatar from './_UserAvatar';

import {
  renderItemId,
  CardText,
  ContentRow,
  FullView,
  HighlightContainerRow1,
  LeftColumn,
  MainColumn,
  RepositoryContentContainer,
  RightOfScrollableContent,
  smallAvatarWidth,
  Text,
} from './';

import { contentPadding, radius } from '../../styles/variables';
import { trimNewLinesAndSpaces } from '../../utils/helpers';
import type { PullRequest, ThemeObject } from '../../utils/types';

@withTheme
export default class extends React.PureComponent {
  props: {
    narrow: boolean,
    pullRequest: PullRequest,
    theme?: ThemeObject,
  };

  render() {
    const { narrow, pullRequest, theme, ...props } = this.props;

    if (!pullRequest) return null;

    const title = trimNewLinesAndSpaces(pullRequest.get('title'));
    if (!title) return null;

    const {
      number,
      state,
      user,
    } = {
      number: pullRequest.get('number'),
      state: pullRequest.get('state'),
      user: pullRequest.get('user'),
    };

    const { icon, color } = (() => {
      switch (state) {
        case 'closed':
          return { icon: 'git-pull-request', color: theme.red };
        default:
          return { icon: 'git-pull-request', color: theme.green };
      }
    })();

    const byText = user && user.get('login') ? `@${user.get('login')}` : '';

    return (
      <ContentRow narrow={narrow} {...props}>
        <LeftColumn center>
          <UserAvatar url={user.get('avatar_url')} size={smallAvatarWidth} />
        </LeftColumn>

        <MainColumn>
          <HighlightContainerRow1>
            <FullView>
              <TransparentTextOverlay
                color={theme.base01}
                size={contentPadding}
                from="horizontal"
                radius={radius}
              >
                <RepositoryContentContainer>
                  <CardText numberOfLines={1}>
                    <Icon name={icon} color={color} />&nbsp;
                    {title}
                    {byText && <Text muted small> by {byText}</Text>}
                  </CardText>
                </RepositoryContentContainer>
              </TransparentTextOverlay>
            </FullView>

            <RightOfScrollableContent>
              {renderItemId(number)}
            </RightOfScrollableContent>
          </HighlightContainerRow1>
        </MainColumn>
      </ContentRow>
    );
  }
}
