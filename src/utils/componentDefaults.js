export function getDefaultComponentProps(type) {
    const timestamp = Date.now();
    switch (type) {
      case 'text':
        return {
          props: {
            text: '默认文本',
            style: {
              fontSize: '14px',
              color: '#000000'
            }
          }
        };
      case 'layout':
        return {
          children: [
            { id: timestamp + 1, type: 'col', children: [] },
            { id: timestamp + 2, type: 'col', children: [] },
            { id: timestamp + 3, type: 'col', children: [] },
            { id: timestamp + 4, type: 'col', children: [] }
          ]
        };
      case 'image':
        return {
          props: {
            src: 'https://static.form-create.com/example.png',
            style: {
              width: '100px',
              maxWidth: '100px'
            }
          }
        };
      case 'button':
        return {
          props: {
            text: '按钮',
            plain: false,
            style: {
              fontSize: '14px',
              color: '#000000'
            }
          }
        };
      default:
        return {};
    }
  }
  