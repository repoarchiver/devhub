import React, { PureComponent } from 'react'

import { CommitRow } from './CommitRow'
import { RenderItem, RowList } from './RowList'

import { GitHubCommit } from '../../../../types'

export interface CommitListRowProps {
  isRead: boolean
  maxHeight?: number
  commits: GitHubCommit[]
}

export class CommitListRow extends PureComponent<CommitListRowProps> {
  renderItem: RenderItem<GitHubCommit> = ({
    showMoreItemsIndicator,
    item: commit,
  }) => {
    if (!(commit && commit.sha && commit.message)) return null

    return (
      <CommitRow
        key={`commit-row-${commit.sha}`}
        {...this.props}
        authorEmail={commit.author.email}
        authorName={commit.author.name}
        message={commit.message}
        showMoreItemsIndicator={showMoreItemsIndicator}
        url={commit.url}
      />
    )
  }

  render() {
    const { commits, ...props } = this.props

    if (!(commits && commits.length > 0)) return null

    return <RowList {...props} data={commits} renderItem={this.renderItem} />
  }
}