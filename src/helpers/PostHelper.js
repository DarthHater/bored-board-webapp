import config from 'react-global-configuration';

// eslint-disable-next-line import/prefer-default-export
export function canEditPost(post) {
  const milliseconds = new Date().getTime() - new Date(post.PostedAt).getTime();
  return milliseconds / 60000 < config.get('EDIT_POST_TIME');
}
