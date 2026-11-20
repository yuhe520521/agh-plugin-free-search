# Free Search

由 gen-mcp-bridge.mjs 从 https://api-dashboard.search.brave.com/mcp 的 tools/list 直接生成。

- 工具数：23（服务端共 23）
- 覆盖端点：`https://api-dashboard.search.brave.com/mcp`

## 凭据配置（首次使用必读）

这个插件本身**不携带**访问凭据，需要在运行 AGH 的环境里配置环境变量：

```
MCP_API_KEY=<你的 key>
```

key 获取方式（摘自原插件文档）：AGH Harness 免费搜索插件：无需 API key，零成本，多引擎可切换。** 这是一个给 AGH Harness (agh) 添加多引擎搜索 provider 的插件，注册进 `ctx.web` seam。内置 `web_search` 工具自动选用，支持网页设置页切换引擎、配置 API key、一键测试所有引擎、弹出式命令切换引擎。

配置后重启 AGH 或重新加载插件即可生效。未配置时工具调用会报
`MCP_API_KEY is not configured` 或 `401 Sign-in required` ——
这属于运行环境未就绪，不是插件缺陷。

重新生成：`node gen-mcp-bridge.mjs --endpoint https://api-dashboard.search.brave.com/mcp --key-env MCP_API_KEY --prefix free_search_e3765167 --out /home/node/agh-artifacts/agh-free-search-e3765167/agn-plugin --name @agh-hub/free-search-e3765167`
