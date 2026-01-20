// ========================================
// Trust Route - Comments Module
// ========================================

const CommentsModule = {
  // 댓글 목록 가져오기
  async getComments(restaurantId) {
    const supabase = getSupabaseClient();
    if (!supabase) {
      console.warn('Supabase client not available');
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Failed to load comments:', err);
      return [];
    }
  },

  // 댓글 작성
  async createComment(restaurantId, content) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase not initialized');

    if (!AuthModule.isAuthenticated()) {
      throw new Error('로그인이 필요합니다');
    }

    const userId = AuthModule.getUserId();
    const userEmail = AuthModule.getUserEmail();

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            restaurant_id: restaurantId,
            user_id: userId,
            user_email: userEmail,
            content: content.trim(),
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) throw error;
      return data[0];
    } catch (err) {
      console.error('Failed to create comment:', err);
      throw err;
    }
  },

  // 댓글 수정
  async updateComment(commentId, content) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase not initialized');

    if (!AuthModule.isAuthenticated()) {
      throw new Error('로그인이 필요합니다');
    }

    const userId = AuthModule.getUserId();

    try {
      const { data, error } = await supabase
        .from('comments')
        .update({ content: content.trim() })
        .eq('id', commentId)
        .eq('user_id', userId) // 본인 댓글만 수정 가능
        .select();

      if (error) throw error;
      return data[0];
    } catch (err) {
      console.error('Failed to update comment:', err);
      throw err;
    }
  },

  // 댓글 삭제
  async deleteComment(commentId) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase not initialized');

    if (!AuthModule.isAuthenticated()) {
      throw new Error('로그인이 필요합니다');
    }

    const userId = AuthModule.getUserId();

    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
        .eq('user_id', userId); // 본인 댓글만 삭제 가능

      if (error) throw error;
    } catch (err) {
      console.error('Failed to delete comment:', err);
      throw err;
    }
  },

  // 댓글 HTML 렌더링
  renderCommentHTML(comment) {
    const isOwner = AuthModule.isAuthenticated() && AuthModule.getUserId() === comment.user_id;
    const createdAt = new Date(comment.created_at).toLocaleDateString('ko-KR');

    return `
      <div class="comment-item" data-comment-id="${comment.id}">
        <div class="comment-header">
          <strong class="comment-author">${this.maskEmail(comment.user_email)}</strong>
          <span class="comment-date">${createdAt}</span>
        </div>
        <p class="comment-content">${this.escapeHTML(comment.content)}</p>
        ${isOwner ? `
          <div class="comment-actions">
            <button class="comment-edit-btn" data-comment-id="${comment.id}">수정</button>
            <button class="comment-delete-btn" data-comment-id="${comment.id}">삭제</button>
          </div>
        ` : ''}
      </div>
    `;
  },

  // 이메일 마스킹 (프라이버시 보호)
  maskEmail(email) {
    if (!email) return '익명';
    const [username, domain] = email.split('@');
    if (username.length <= 2) {
      return `${username[0]}*@${domain}`;
    }
    return `${username.slice(0, 2)}***@${domain}`;
  },

  // HTML 이스케이프 (XSS 방지)
  escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};
