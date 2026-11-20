// 由 gen-mcp-bridge.mjs 从 MCP 服务端 schema 直接生成，勿手改
const Kind = Symbol.for('TypeBox.Kind')

const SCHEMAS = {
  "sidebar.panellist": {
    "description": "sidebar.panellist（参数透传：本工具的参数 schema 未从服务端在线获取）",
    "input": {
      "type": "object",
      "properties": {}
    }
  },
  "main": {
    "description": "main（参数透传：本工具的参数 schema 未从服务端在线获取）",
    "input": {
      "type": "object",
      "properties": {}
    }
  },
  "plugins.row.config": {
    "description": "plugins.row.config（参数透传：本工具的参数 schema 未从服务端在线获取）",
    "input": {
      "type": "object",
      "properties": {}
    }
  },
  "plugins.bundle.config": {
    "description": "plugins.bundle.config（参数透传：本工具的参数 schema 未从服务端在线获取）",
    "input": {
      "type": "object",
      "properties": {}
    }
  },
  "free-search-engine": {
    "description": "free-search-engine（参数透传：本工具的参数 schema 未从服务端在线获取）",
    "input": {
      "type": "object",
      "properties": {}
    }
  },
  "free-search": {
    "description": "free-search（参数透传：本工具的参数 schema 未从服务端在线获取）",
    "input": {
      "type": "object",
      "properties": {}
    }
  },
  "search_pro": {
    "description": "search_pro（参数透传：本工具的参数 schema 未从服务端在线获取）",
    "input": {
      "type": "object",
      "properties": {}
    }
  },
  "web_search": {
    "description": "web_search（参数透传：本工具的参数 schema 未从服务端在线获取）",
    "input": {
      "type": "object",
      "properties": {}
    }
  },
  "web_search_exa": {
    "description": "web_search_exa（参数透传：本工具的参数 schema 未从服务端在线获取）",
    "input": {
      "type": "object",
      "properties": {}
    }
  },
  "search_web_pages": {
    "description": "search_web_pages（参数透传：本工具的参数 schema 未从服务端在线获取）",
    "input": {
      "type": "object",
      "properties": {}
    }
  },
  "global_search": {
    "description": "global_search（参数透传：本工具的参数 schema 未从服务端在线获取）",
    "input": {
      "type": "object",
      "properties": {}
    }
  },
  "zhihu_search": {
    "description": "zhihu_search（参数透传：本工具的参数 schema 未从服务端在线获取）",
    "input": {
      "type": "object",
      "properties": {}
    }
  },
  "free_search_test": {
    "description": "free_search_test（参数透传：本工具的参数 schema 未从服务端在线获取）",
    "input": {
      "type": "object",
      "properties": {}
    }
  },
  "platform_search": {
    "description": "platform_search（参数透传：本工具的参数 schema 未从服务端在线获取）",
    "input": {
      "type": "object",
      "properties": {}
    }
  },
  "video_search": {
    "description": "video_search（参数透传：本工具的参数 schema 未从服务端在线获取）",
    "input": {
      "type": "object",
      "properties": {}
    }
  },
  "weather": {
    "description": "weather（参数透传：本工具的参数 schema 未从服务端在线获取）",
    "input": {
      "type": "object",
      "properties": {}
    }
  },
  "advanced_search": {
    "description": "advanced_search（参数透传：本工具的参数 schema 未从服务端在线获取）",
    "input": {
      "type": "object",
      "properties": {}
    }
  },
  "multi_search": {
    "description": "multi_search（参数透传：本工具的参数 schema 未从服务端在线获取）",
    "input": {
      "type": "object",
      "properties": {}
    }
  },
  "free-search:engines": {
    "description": "free-search:engines（参数透传：本工具的参数 schema 未从服务端在线获取）",
    "input": {
      "type": "object",
      "properties": {}
    }
  },
  "web_fetch": {
    "description": "web_fetch（参数透传：本工具的参数 schema 未从服务端在线获取）",
    "input": {
      "type": "object",
      "properties": {}
    }
  },
  "domain_search": {
    "description": "domain_search（参数透传：本工具的参数 schema 未从服务端在线获取）",
    "input": {
      "type": "object",
      "properties": {}
    }
  },
  "research": {
    "description": "research（参数透传：本工具的参数 schema 未从服务端在线获取）",
    "input": {
      "type": "object",
      "properties": {}
    }
  },
  "cache_search": {
    "description": "cache_search（参数透传：本工具的参数 schema 未从服务端在线获取）",
    "input": {
      "type": "object",
      "properties": {}
    }
  }
}

// JSON Schema -> TypeBox 节点。AGH 靠 Symbol 键识别 kind，缺了会被判 schema 无法解释。
function tb(schema) {
  if (!schema || typeof schema !== 'object') return { [Kind]: 'Any', type: 'object', properties: {} }
  if (Array.isArray(schema.anyOf)) {
    const variants = schema.anyOf.map(tb)
    return { [Kind]: 'Union', anyOf: variants }
  }
  const desc = typeof schema.description === 'string' ? { description: schema.description } : {}
  switch (schema.type) {
    case 'string':
      return { [Kind]: 'String', type: 'string', ...desc, ...(schema.enum ? { enum: schema.enum } : {}) }
    case 'number':
      return { [Kind]: 'Number', type: 'number', ...desc }
    case 'integer':
      return { [Kind]: 'Integer', type: 'integer', ...desc }
    case 'boolean':
      return { [Kind]: 'Boolean', type: 'boolean', ...desc }
    case 'array':
      return { [Kind]: 'Array', type: 'array', items: tb(schema.items), ...desc }
    case 'object':
    case undefined: {
      const props = {}
      for (const [k, v] of Object.entries(schema.properties || {})) props[k] = tb(v)
      const required = Array.isArray(schema.required) ? schema.required : []
      const node = { [Kind]: 'Object', type: 'object', properties: props, ...desc }
      if (required.length) node.required = required
      // 允许自由字段的（additionalProperties: true），显式带上，别用 undefined 让底层崩
      if (schema.additionalProperties === true) node.additionalProperties = true
      return node
    }
    default:
      return { [Kind]: 'Any', type: 'object', properties: {} }
  }
}

async function callMcpTool(toolName, args) {
  const endpoint = process.env.MCP_ENDPOINT || "https://api-dashboard.search.brave.com/mcp"
  const apiKey = process.env.MCP_API_KEY
  if (!apiKey) throw new Error('MCP_API_KEY is not configured')

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/event-stream',
      'x-api-key': apiKey,
    },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: toolName, arguments: args } }),
    signal: AbortSignal.timeout(30000),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error('MCP request failed with status ' + res.status + ': ' + body.slice(0, 200))
  }

  const rawText = await res.text()
  let data
  if (/^s*(data:|event:)/.test(rawText)) {
    for (const line of rawText.split('\n')) {
      if (!line.startsWith('data:')) continue
      const body = line.slice(5).trim()
      if (!body || body === '[DONE]') continue
      try { data = JSON.parse(body) } catch { /* ignore */ }
    }
    if (!data) throw new Error('MCP 返回 SSE 但无法解析出 JSON-RPC 响应')
  } else {
    data = JSON.parse(rawText)
  }

  if (data.error) throw new Error('MCP error: ' + JSON.stringify(data.error))
  if (data.result && Array.isArray(data.result.content)) {
    const text = data.result.content.map((c) => c.text || '').join('\n')
    if (data.result.isError) throw new Error(text || 'MCP tool returned an error')
    return text
  }
  return JSON.stringify(data.result ?? '')
}

const textResult = (text) => ({ content: [{ type: 'text', text: String(text ?? '') }] })

const TOOL_DEFS = Object.entries(SCHEMAS).map(([rawName, def]) => ({
  name: "free_search_e3765167" + '_' + rawName,
  remoteName: rawName,
  description: def.description,
  parameters: tb(def.input),
}))

const readOnlyHint = []

export const freeSearchE3765167 = {
  id: 'ext:free-search-e3765167/main',
  name: 'free-search-e3765167',
  version: '0.1.0',
  apiRange: '^5.0.0',
  inject: ['tools'],
  apply(ctx) {
    for (const def of TOOL_DEFS) {
      const readOnly = readOnlyHint.includes(def.remoteName)
      // 「不是只读」不等于「破坏性」。新建/更新/导入这类写操作会改变数据，但不会毁掉已有内容，
      // 把它们一并标成 destructive 会让用户以为有风险，审批提示也失去区分度。
      // 只有真正删改已有数据的才配 destructive。
      const destructive = /delete|remove|destroy|trash|purge|wipe|erase|reset|clear/i.test(def.remoteName)
      ctx.tools.register({
        name: def.name,
        description: def.description,
        parameters: def.parameters,
        meta: {
          isReadOnly: readOnly,
          isDestructive: destructive,
          isConcurrencySafe: readOnly,
          isOpenWorld: true,
          replay: readOnly ? 'safe' : 'never',
          costHint: {},
          deferLoading: true,
          discoveryGroup: 'free-search-e3765167',
          requiresApproval: readOnly ? 'never' : destructive ? 'destructive' : 'always',
        },
        async execute(args) {
          return textResult(await callMcpTool(def.remoteName, args || {}))
        },
      })
    }
  },
}

export default freeSearchE3765167
