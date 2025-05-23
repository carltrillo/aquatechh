import { createClient } from '@supabase/supabase-js'

// 👉 Create a single supabase client for interacting with your database
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)

export const supabaseAdmin = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// 👉 Form Action utils
export const formActionDefault = {
  formProcess: false,
  formStatus: 200,
  formErrorMessage: '',
  formSuccessMessage: ''
}

// 👉 Table Pagination
export const tablePagination = (
  { page, itemsPerPage, sortBy },
  defaultColumn = 'id',
  isAscending = true,
) => {
  const [column, order] = sortBy[0]
    ? [sortBy[0].key, sortBy[0].order === 'asc']
    : [defaultColumn, isAscending]

  if (itemsPerPage === -1) {
    const rangeStart = 0
    const rangeEnd = 999999999999999

    return { rangeStart, rangeEnd, column, order }
  }

  const rangeStart = (page - 1) * itemsPerPage
  const rangeEnd = rangeStart + itemsPerPage - 1

  return { rangeStart, rangeEnd, column, order }
}

// 👉 Handle Search if null turn to empty string
export const tableSearch = (search) => {
  return (search ||= '')
}
