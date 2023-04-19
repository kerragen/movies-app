import { Alert, Space } from 'antd'
const ErrorSearch = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert message="Error" description="Nothing was found" type="error" showIcon />
  </Space>
)
export default ErrorSearch
