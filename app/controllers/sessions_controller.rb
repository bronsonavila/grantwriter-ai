class SessionsController < ApplicationController
  def destroy
    reset_session

    respond_to do |format|
      format.turbo_stream
      format.html { redirect_to root_path, notice: "Session reset." }
    end
  end
end
